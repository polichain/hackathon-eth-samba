// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Rent {
	bool private locked;

	struct Contract {
		address payable renter;
		address payable locator;
		uint insuranceAmount;
		uint rentAmount;
		uint definedTime;
		uint timeRemaining;
		ContractState state;
	}

	mapping(address => Contract) public rentContracts;

	enum ContractState {
		Uninitialized,
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

		Contract storage newContract = rentContracts[_renter];
		newContract.renter = _renter;
		newContract.locator = payable(msg.sender); // Assuming msg.sender is the locator
		newContract.insuranceAmount = _insuranceAmount;
		newContract.rentAmount = _rentAmount;
		newContract.definedTime = _definedTime;
		newContract.timeRemaining = _definedTime;
		newContract.state = ContractState.StandBy;
	}

	function payRent() public payable noReentrancy {
		require(
			rentContracts[msg.sender].state == ContractState.Active,
			"The contract is not active"
		);
		rentContracts[msg.sender].locator.transfer(msg.value);

		rentContracts[msg.sender].timeRemaining--;

		if (rentContracts[msg.sender].timeRemaining == 0) {
			rentContracts[msg.sender].state = ContractState.Completed;
			receiveInsurance(msg.sender);
			emit ContractCompleted();
		}
		emit RentPaid(msg.sender, msg.value);
	}

	function abortContract() public payable noReentrancy {
		require(
			rentContracts[msg.sender].state == ContractState.Active,
			"The contract is not active"
		);
		require(
			rentContracts[msg.sender].renter == msg.sender ||
				rentContracts[msg.sender].locator == msg.sender,
			"Only the renter or locator can abort the contract"
		);

		uint time_percentage = (rentContracts[msg.sender].definedTime * (30)) /
			(100);
		if (
			msg.sender == rentContracts[msg.sender].renter &&
			time_percentage >
			(rentContracts[msg.sender].definedTime -
				rentContracts[msg.sender].timeRemaining)
		) {
			rentContracts[msg.sender].timeRemaining = 1;
		} else {
			rentContracts[msg.sender].state = ContractState.Aborted;
			emit ContractAborted(msg.sender);
		}

		(bool success, ) = rentContracts[msg.sender].renter.call{
			value: rentContracts[msg.sender].rentAmount
		}("");
		require(success, "transfer failed");
	}

	function payInsurance() public payable noReentrancy {
		require(
			rentContracts[msg.sender].state == ContractState.StandBy,
			"Contract is not in stand by"
		);
		require(
			msg.sender == rentContracts[msg.sender].renter,
			"Only the renter can do this operation"
		);
		require(
			msg.value >= rentContracts[msg.sender].insuranceAmount,
			"Insurance must be higher"
		);

		rentContracts[msg.sender].state = ContractState.Active;
		emit InsurancePaid(msg.sender, msg.value, address(this));
	}

	function receiveInsurance(address _renter) internal {
		(bool success, ) = rentContracts[_renter].renter.call{
			value: rentContracts[_renter].insuranceAmount
		}("");
		require(success, "transfer failed");
	}

	function getState(address _renter) internal view returns (string memory) {
		if (rentContracts[_renter].state == ContractState.StandBy) {
			return "Stand By";
		} else if (rentContracts[_renter].state == ContractState.Aborted) {
			return "Aborted";
		} else if (rentContracts[_renter].state == ContractState.Completed) {
			return "Completed";
		} else if (rentContracts[_renter].state == ContractState.Active) {
			return "Active";
		} else {
			return "The renter don t have a contract";
		}
	}

	function getContracts(address _user) public view returns (string memory) {
		if (rentContracts[msg.sender].renter == _user) {
			string memory ContractsData = string(
				abi.encodePacked(
					"Locator address: ",
					addressToString(rentContracts[msg.sender].locator),
					"<br/>",
					"Insurance amount: ",
					uintToString(rentContracts[msg.sender].insuranceAmount),
					"<br/>",
					"Rent amount: ",
					uintToString(rentContracts[msg.sender].rentAmount),
					"<br/>",
					"Contract State: ",
					getState(msg.sender),
					"<br/>",
					"Defined Time: ",
					uintToString(rentContracts[msg.sender].definedTime),
					"<br/>",
					"Time remaining: ",
					uintToString(rentContracts[msg.sender].timeRemaining)
				)
			);
			return ContractsData;
		} else {
			return "This address doesn't have a contract";
		}
	}

	function getContractState(
		address _user
	) public view returns (ContractState) {
		return rentContracts[_user].state;
	}

	function getInsuranceAmount(address _renter) public view returns (uint) {
		return rentContracts[_renter].insuranceAmount;
	}

	function uintToString(uint v) internal pure returns (string memory) {
		if (v == 0) {
			return "0";
		}

		uint maxlength = 100;
		bytes memory reversed = new bytes(maxlength);
		uint i = 0;
		while (v != 0) {
			uint remainder = v % 10;
			v = v / 10;
			reversed[i++] = bytes1(uint8(48 + remainder));
		}

		bytes memory s = new bytes(i);
		for (uint j = 0; j < i; j++) {
			s[j] = reversed[i - j - 1];
		}

		return string(s);
	}

	function addressToString(
		address _addr
	) internal pure returns (string memory) {
		bytes32 _bytes = bytes32(uint256(uint160(_addr)));
		bytes memory HEX = "0123456789abcdef";
		bytes memory _string = new bytes(42);
		_string[0] = "0";
		_string[1] = "x";
		for (uint i = 0; i < 20; i++) {
			_string[2 + i * 2] = HEX[uint8(_bytes[i + 12] >> 4)];
			_string[3 + i * 2] = HEX[uint8(_bytes[i + 12] & 0x0f)];
		}
		return string(_string);
	}
}
