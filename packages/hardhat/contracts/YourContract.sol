// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract YourContract {
    uint public timeRemaining; // Duration of the rental agreement in months
    uint public rentAmount; // Monthly rent amount in wei
    uint public insuranceAmount; // Insurance amount in wei
    address payable public renter; // Address of the renter
    address payable public locator; // Address of the entity receiving the rent
    address payable public adminWallet; // Address of the administrative wallet handling insurance
    bool isInsurance = false; // This boolean shows the stats of the Insurence, if is it payed or not

    enum ContractState { Active, Aborted, Completed }
    ContractState public state;

    event RentPaid(address indexed payer, uint amount);
    event ContractAborted(address indexed sender);
    event ContractCompleted();

    constructor(
        uint _timeRemaining,
        uint _rentAmount,
        uint _insuranceAmount,
        address payable _renter,
        address payable _locator,
        address payable _adminWallet
    ) {
        timeRemaining = _timeRemaining;
        rentAmount = _rentAmount;
        insuranceAmount = _insuranceAmount;
        renter = _renter;
        locator = _locator;
        adminWallet = _adminWallet;
        state = ContractState.Active;
    }

    modifier onlyRenter() {
        require(msg.sender == renter, "Only the renter can perform this action");
        _;
    }

    modifier onlyActiveContract() {
        require(state == ContractState.Active, "Contract is not active");
        _;
    }

    function payRent() external payable onlyRenter onlyActiveContract {
        require(isInsurance, "Impossible to pay rents before the insurance");
        require(msg.value >= (rentAmount + insuranceAmount)*10**18, "Insufficient payment amount");

        uint excessAmount = msg.value - (rentAmount + insuranceAmount)*10**18;
        if (excessAmount > 0) {
            payable(msg.sender).transfer(excessAmount); // Refund excess amount
        }

        locator.transfer(rentAmount);

        timeRemaining--;

        emit RentPaid(msg.sender, msg.value);

        if (timeRemaining == 0) {
            state = ContractState.Completed;
            emit ContractCompleted();
        }
    }


    function abortContract() public onlyActiveContract {
        require(!isInsurance, "Get back the Insurance before end the contract");
        require(msg.sender == renter || msg.sender == locator, "Only the renter or locator can abort the contract");

        state = ContractState.Aborted;
        emit ContractAborted(msg.sender);
    }

    function payInsurance() public payable {
        require(state == ContractState.Active, "Contract is not active");
        require(msg.sender == renter && msg.value >= insuranceAmount, "Only the renter can do this operation and the insurance must be higher");

        uint  excessAmount = msg.value -(insuranceAmount)*10**18;

        if(excessAmount > 0){
            payable(msg.sender).transfer(excessAmount);
        }
        adminWallet.transfer(insuranceAmount*10**18);

        isInsurance = true;
    }

    function receiveInsurance() public payable {
        require(msg.sender == adminWallet, "Only the admin can do this operation");
        require(isInsurance, "There isen't a Insurance to recive");

        renter.transfer(insuranceAmount*10**18);

        isInsurance = false;
    }
}
