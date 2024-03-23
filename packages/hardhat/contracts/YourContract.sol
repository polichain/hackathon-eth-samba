// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Rent {
    uint public timeRemaining; // Duration of the rental agreement in months
    uint public rentAmount; // Monthly rent amount in wei
    uint public insuranceAmount; // Insurance amount in wei
    //uint public fine; //amount of the insurance that must be taken when the contract is aborted or something goes wrong
    address public admin; // Address of the admin
    address payable public renter; // Address of the renter
    address payable public locator; // Address of the entity receiving the rent

    enum ContractState { StandBy,Active, Aborted, Completed }
    ContractState public state;

    event RentPaid(address indexed payer, uint amount);
    event InsurancePaid(address indexed payer,uint amount,address indexed receiver);
    event ContractAborted(address indexed sender);
    event ContractCompleted();

    constructor(
        uint _timeRemaining,
        uint _rentAmount,
        uint _insuranceAmount,
       // uint _fine,
        address _admin,
        address payable _renter,
        address payable _locator
    ) {
        timeRemaining = _timeRemaining;
        rentAmount = _rentAmount;
        insuranceAmount = _insuranceAmount;
        renter = _renter;
        locator = _locator;
        admin = _admin;
        //fine = _fine;
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
       // require(msg.value >= (rentAmount), "Insufficient payment amount");
        //uint excessAmount = msg.value - (rentAmount + insuranceAmount)*10**18;
        //if (excessAmount > 0) {
            //payable(msg.sender).transfer(excessAmount); // Refund excess amount
       // }

        locator.transfer(msg.value);

        timeRemaining--;

        if (timeRemaining == 0) {
            state = ContractState.Completed;
            receiveInsurance();
            emit ContractCompleted();
        }
        emit RentPaid(msg.sender, msg.value);
    }

    function abortContract() public payable onlyActiveContract {
        require(msg.sender == renter || msg.sender == locator, "Only the renter or locator can abort the contract");

        
            (bool success, ) = renter.call{value: insuranceAmount}("");
            require(success, "transfer failed");
        
        state = ContractState.Aborted;
        emit ContractAborted(msg.sender);
    }

    function payInsurance() public payable {
        require(state == ContractState.StandBy, "Contract is in stand by");
        require(msg.sender == renter && msg.value >= insuranceAmount, "Only the renter can do this operation and the insurance must be higher");

        //uint  excessAmount = msg.value -(insuranceAmount)*10**18;

       // if(excessAmount > 0){
           // payable(msg.sender).transfer(excessAmount);
       // }

        state = ContractState.Active;
        emit InsurancePaid(msg.sender, msg.value, address(this));
    }

    function receiveInsurance() internal {

         (bool success, ) = renter.call{value: insuranceAmount}("");
          require(success, "transfer failed");

    }

  function contractBalance() public view returns (uint) {
    return address(this).balance;
}


}