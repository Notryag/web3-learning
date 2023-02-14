// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NWFT {
  string message;

  constructor(string memory _message) {
    message = _message;
  }
  function hello() public view returns(string memory) {
    return message;
  }

  function sendMessage(string memory _message) public {
    message = _message;
  }
}
