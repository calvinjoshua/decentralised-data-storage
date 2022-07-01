//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.12;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract imds is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    struct details {
        uint256 registrationNumber;
        bytes32 metadata; //CID of the object containing description, certificate hash
        bool revoked;
    }

    function initialize() public initializer {
        ///@dev as there is no constructor, we need to initialise the OwnableUpgradeable explicitly
        __Ownable_init();
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

    uint256 public ids;
    //                        0x666f6f0000000000000000000000000000000000000000000000000000000000
    //                        0x6465677265656365727469666963617465310000000000000000000000000000
    //                        0x6365727469666963617465320000000000000000000000000000000000000000
    mapping(uint256 => details) public Details;

    mapping(bytes32 => uint256) public certs;

    //Declare an Event
    event certificate(uint256 _id, uint256 _rid, bytes32 indexed _data);

    function addCertificate(
        uint256 rid,
        bytes32 cId,
        bytes32 Mdata
    ) public onlyOwner {
        require(certs[cId] == 0, "File already uploaded");
        certs[cId] = 1;

        details storage _detail = Details[ids];

        _detail.registrationNumber = rid;
        _detail.metadata = Mdata;
        _detail.revoked = false;

        //used for quering
        emit certificate(ids, rid, Mdata);
        ids++;
    }

    //Incase uploaded accidentaly or found malicious later,
    //revoke can be called so that teh certificate can be marked as "Not recognised by university",
    //but the details are still available,
    function revoke(uint256 _id, bytes32 _cId) external onlyOwner {
        certs[_cId] = 0;
        Details[_id].revoked = true;
    }

    function ratify(uint256 _id, string memory _cId) external onlyOwner {
        certs[_cId] = 1;
        Details[_id].revoked = false;
    }
}
