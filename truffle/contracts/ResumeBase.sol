pragma solidity ^0.5.0;

import { StrLib } from "./StrLib.sol";

contract ResumeBase {
    using StrLib for string;

    address internal government;
    mapping(address => Organization) internal organizations;

    Profile public profile;
    Education[] internal educations;
    Job[] internal experiences;
    Skill[] internal skills;

    enum OrganizationType {
        everyOne,
        school,
        company
    }

    enum EducationStatus {
        undergraduate,
        learning,
        graduate
    }

    enum Gender {
        male,
        female,
        other
    }

    enum DoneCode {
        setPermission,
        setEducation,
        setLicense,
        setCourse,
        setExperience,
        setJobEndDate,
        setAutobiography,
        setSkill,
        setContact,
        removePermission,
        removeSkill
    }

    struct Organization {
        string name;
        OrganizationType property;
        address account;
        bool permission;
    }

    struct Profile {
        string name;
        address account;
        uint8 age;
        Gender gender;
        string contact;
        string autobiography;
    }

    struct Job {
        Organization company;
        string position;
        uint startDate;
        uint endDate;
    }

    struct Skill {
        string class;
        string name;
    }

    struct Education {
        Organization school;
        EducationStatus status;
        string major;
        Course[] courses;
        License[] licenses;
    }

    struct Course {
        string name;
        string content;
        string comment;
        uint8 grade;
    }

    struct License {
        string name;
        string content;
    }

    modifier onlyGov {
        require(msg.sender == government, "Permission denied. Please use government account.");
        _;
    }

    modifier onlySchool {
        bool isSchool = organizations[msg.sender].property == OrganizationType.school;
        require(isSchool && organizations[msg.sender].permission, "Permission denied. Please use school account.");
        _;
    }

    modifier onlyCompany {
        bool isCompany = organizations[msg.sender].property == OrganizationType.company;
        require(isCompany && organizations[msg.sender].permission, "Permission denied. Please use company account.");
        _;
    }

    modifier onlyHost {
        require(msg.sender == profile.account, "Permission denied. Please use host account.");
        _;
    }

    modifier IndexValidator(uint index, uint max) {
        require(index < max, "Out of range.");
        _;
    }

    event done(DoneCode eventCode, string message);

    constructor(string memory name, address account, uint8 age, Gender gender) public {
        government = msg.sender;
        profile = Profile({
            name: name,
            account: account,
            age: age,
            gender: gender,
            contact: "",
            autobiography: ""
        });
    }

    function findOrganization(address org, string memory property) internal view returns(int) {
        int index = -1;
        if (property.compare("education")) {
            for (uint i = 0; i < educations.length; i++) {
                if (educations[i].school.account == org) {
                    index = int(i);
                    break;
                }
            }
        } else if (property.compare("experience")) {
            for (uint i = 0; i < experiences.length; i++) {
                if (experiences[i].company.account == org) {
                    index = int(i);
                    break;
                }
            }
        }
        return index;
    }

}
