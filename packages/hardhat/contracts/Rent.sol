// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Rent {
	bool private locked;
	uint public next_index;

	struct Contract {
		address payable renter;
		address payable locator;
		uint insuranceAmount;
		uint rentAmount;
		uint definedTime;
		uint timeRemaining;
		ContractState state;
	}

	mapping(uint => Contract) public rentContracts;

	enum ContractState {
		StandBy,
		Active,
		Aborted,
		Completed
	}
	ContractState public state;

	event RentPaid(address indexed payer, uint amount);
	event InsurancePaid(
		address indexed payer,
		uint amount,
		address indexed receiver
	);
	event ContractAborted(address indexed sender);
	event ContractCompleted();

	//modifier onlyRenter() {
	//require(msg.sender == renter, "Only the renter can perform this action");
	//_;
	//}

	// modifier onlyActiveContract() {
	// require(state == ContractState.Active, "Contract is not active");
	//_;
	// }

	modifier noReentrancy() {
		require(!locked, "No reentrancy");
		locked = true;
		_;
		locked = false;
	}

	function createNewContract(
		address payable _renter,
		uint _insuranceAmount,
		uint _rentAmount,
		uint _definedTime
	) external {
		// Ideally, include access control here (e.g., only the admin or locator can create a new contract)
		next_index++;
		Contract storage newContract = rentContracts[next_index];
		newContract.renter = _renter;
		newContract.locator = payable(msg.sender); // Assuming msg.sender is the locator
		newContract.insuranceAmount = _insuranceAmount;
		newContract.rentAmount = _rentAmount;
		newContract.definedTime = _definedTime;
		newContract.timeRemaining = _definedTime;
		newContract.state = ContractState.StandBy;

	}

	function payRent(uint index) public payable noReentrancy {
		require(
			rentContracts[index].state == ContractState.Active,
			"The contract is not active"
		);
		rentContracts[index].locator.transfer(msg.value);

		rentContracts[index].timeRemaining--;

		if (rentContracts[index].timeRemaining == 0) {
			rentContracts[index].state = ContractState.Completed;
			receiveInsurance(index);
			emit ContractCompleted();
		}
		emit RentPaid(msg.sender, msg.value);
	}

	function abortContract(uint index) public payable noReentrancy {
		require(
			rentContracts[index].state == ContractState.Active,
			"The contract is not active"
		);
		require(
			rentContracts[index].renter == msg.sender ||
				rentContracts[index].locator == msg.sender,
			"Only the renter or locator can abort the contract"
		);

		// uint time_percentage = definedTime*(70)/(100);
		//if(msg.sender == renter && time_percentage < (definedTime - timeRemaining )){

		//  }

		(bool success, ) = rentContracts[index].renter.call{
			value: rentContracts[index].rentAmount
		}("");
		require(success, "transfer failed");

		rentContracts[index].state = ContractState.Aborted;
		emit ContractAborted(msg.sender);
	}

	function payInsurance(uint index) public payable noReentrancy {
		require(
			rentContracts[index].state == ContractState.StandBy,
			"Contract is not in stand by"
		);
		require(
			msg.sender == rentContracts[index].renter &&
				msg.value >= rentContracts[index].insuranceAmount,
			"Only the renter can do this operation and the insurance must be higher"
		);

		rentContracts[index].state = ContractState.Active;
		emit InsurancePaid(msg.sender, msg.value, address(this));
	}

	function receiveInsurance(uint index) internal {
		(bool success, ) = rentContracts[index].renter.call{
			value: rentContracts[index].insuranceAmount
		}("");
		require(success, "transfer failed");
	}

	function contractBalance() public view returns (uint) {
		return address(this).balance;
	}
}
