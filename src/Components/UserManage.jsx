import React, { useEffect, useState } from "react";
import userData from "../utils/jsonFiles/userData.json";
import avatar from "../utils/images/ava.jpg";
import "../Styles/UserManage.css";

const fs = require("fs");

function UserManage() {
    const [allProfileData, setAllProfileData] = useState([]);
    const [profileData, setProfileData] = useState([]);
    const [newProfileData, setNewProfileData] = useState([]);
    const [currentProfile, setCurrentProfile] = useState({});

    const toTitleCase = (phrase) => {
        return phrase
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    const loadData = () => {
        var allUserList = [];
        var userList = [];
        var newUserList = [];

        var keys = Object.keys(userData);
        keys.forEach(function (key) {
            if (userData[key].status === "true") {
                userList.push(userData[key]);
            } else {
                newUserList.push(userData[key]);
            }
            allUserList.push(userData[key]);
        });

        setProfileData(userList);
        setNewProfileData(newUserList);
        setAllProfileData(allUserList);
    };

    const showUserProfile = (profileIndex, status) => {
        const layerBlur = document.querySelectorAll(".layer-blur");
        const userProfile = document.querySelectorAll(".user-profile");
        const newUserProfile = document.querySelectorAll(".new-user-profile");

        layerBlur.forEach((layer) => {
            layer.classList.remove("layer-hidden");
            layer.classList.add("layer-show");
        });

        userProfile.forEach((layer) => {
            layer.classList.remove("layer-hidden");
            layer.classList.add("layer-show");
        });

        newUserProfile.forEach((layer) => {
            layer.classList.remove("layer-show");
            layer.classList.add("layer-hidden");
        });

        var count = -1;

        allProfileData.forEach((item) => {
            if (item.status === status.toString()) {
                if (++count === profileIndex) {
                    setCurrentProfile(item);
                }
            }
        });
    };

    const showNewUserProfile = (profileIndex) => {
        const layerBlur = document.querySelectorAll(".layer-blur");
        const userProfile = document.querySelectorAll(".user-profile");
        const newUserProfile = document.querySelectorAll(".new-user-profile");

        layerBlur.forEach((layer) => {
            layer.classList.remove("layer-hidden");
            layer.classList.add("layer-show");
        });

        userProfile.forEach((layer) => {
            layer.classList.remove("layer-show");
            layer.classList.add("layer-hidden");
        });

        newUserProfile.forEach((layer) => {
            layer.classList.remove("layer-hidden");
            layer.classList.add("layer-show");
        });

        newProfileData.forEach((item, index) => {
            if (index === profileIndex) {
                setCurrentProfile(item);
            }
        });
    };

    const hideUserProfile = () => {
        const layerBlur = document.querySelectorAll(".layer-blur");
        const userProfile = document.querySelectorAll(".user-profile");
        const newUserProfile = document.querySelectorAll(".new-user-profile");
        const removeProfile = document.querySelectorAll(".remove-profile");
        const removeNewProfile = document.querySelectorAll(".remove-new-profile");

        layerBlur.forEach((layer) => {
            layer.classList.remove("layer-show");
            layer.classList.add("layer-hidden");
        });

        userProfile.forEach((layer) => {
            layer.classList.remove("layer-show");
            layer.classList.add("layer-hidden");
        });

        newUserProfile.forEach((layer) => {
            layer.classList.remove("layer-show");
            layer.classList.add("layer-hidden");
        });

        removeProfile.forEach((layer) => {
            layer.classList.remove("layer-show");
            layer.classList.add("layer-hidden");
        });

        removeNewProfile.forEach((layer) => {
            layer.classList.remove("layer-show");
            layer.classList.add("layer-hidden");
        });
    };

    const removeUserProfile = (profileIndex, status) => {
        const layerBlur = document.querySelectorAll(".layer-blur");
        const removeProfile = document.querySelectorAll(".remove-profile");
        const removeNewProfile = document.querySelectorAll(".remove-new-profile");

        layerBlur.forEach((layer) => {
            layer.classList.remove("layer-hidden");
            layer.classList.add("layer-show");
        });

        removeProfile.forEach((layer) => {
            layer.classList.remove("layer-hidden");
            layer.classList.add("layer-show");
        });

        removeNewProfile.forEach((layer) => {
            layer.classList.remove("layer-show");
            layer.classList.add("layer-hidden");
        });

        var count = -1;

        allProfileData.forEach((item) => {
            if (item.status === status.toString()) {
                if (++count === profileIndex) {
                    setCurrentProfile(item);
                }
            }
        });
    };

    const removeNewUserProfile = (profileIndex, status) => {
        const layerBlur = document.querySelectorAll(".layer-blur");
        const removeProfile = document.querySelectorAll(".remove-profile");
        const removeNewProfile = document.querySelectorAll(".remove-new-profile");

        layerBlur.forEach((layer) => {
            layer.classList.remove("layer-hidden");
            layer.classList.add("layer-show");
        });

        removeProfile.forEach((layer) => {
            layer.classList.remove("layer-show");
            layer.classList.add("layer-hidden");
        });

        removeNewProfile.forEach((layer) => {
            layer.classList.remove("layer-hidden");
            layer.classList.add("layer-show");
        });

        var count = -1;

        allProfileData.forEach((item) => {
            if (item.status === status.toString()) {
                if (++count === profileIndex) {
                    setCurrentProfile(item);
                }
            }
        });
    };

    const confirmRemove = () => {
        var allUserList = [];

        allProfileData.forEach((item) => {
            if (item.accountId !== currentProfile.accountId) {
                allUserList.push(item);
            }
        });

        const data = JSON.stringify(allUserList);
    };

    useEffect(() => {
        loadData();
        return () => {};
    }, [profileData, newProfileData, allProfileData]);

    return (
        <div class="bg-white font-Kanit" data-theme="retro">
            <div class="lg:block hidden">
                <div class="flex w-full p-5 sm:p-1 sm:pt-5">
                    <div class="flex flex-col mr-2 items-center w-2/3 sm:mr-1">
                        <div class="font-bold sm:text-lg xl:text-xl 2xl:text-2xl text-info mb-5">
                            DANH SÁCH NGƯỜI DÙNG
                        </div>
                        <div class="w-full h-[520px] overflow-x-hidden overflow-y-scroll no-scrollbar bg-base-100">
                            <table class="table">
                                <thead class="sticky top-0 bg-white z-10">
                                    <tr>
                                        <th class="font-bold text-red-500 sm:text-sm xl:text-base 2xl:text-base">
                                            STT
                                        </th>
                                        <th class="font-bold text-red-500 sm:text-sm xl:text-base 2xl:text-base">
                                            Tên tài khoản
                                        </th>
                                        <th class="font-bold text-red-500 sm:text-sm xl:text-base 2xl:text-base">
                                            Họ và tên
                                        </th>
                                        <th class="font-bold text-red-500 sm:text-sm xl:text-base 2xl:text-base">
                                            Email
                                        </th>
                                        <th class="font-bold text-red-500 sm:text-sm xl:text-base 2xl:text-base">
                                            Vai trò
                                        </th>
                                        <th class="font-bold text-red-500 sm:text-sm xl:text-base 2xl:text-base text-center">
                                            Chỉnh sửa
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {profileData.map((obj, index) => {
                                        return (
                                            <tr
                                                class="hover cursor-pointer"
                                                onClick={() => {
                                                    showUserProfile(index, true);
                                                }}
                                            >
                                                <td>{index + 1}</td>
                                                <td>{obj.userName}</td>
                                                <td>{toTitleCase(obj.fullName)}</td>
                                                <td>{obj.email}</td>
                                                <td>{toTitleCase(obj.role)}</td>
                                                <td class="text-center">
                                                    <button class="btn btn-sm btn-square btn-info brightness-200 m-1">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            class="h-5 w-5"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="#000000"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        >
                                                            <polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon>
                                                            <line
                                                                x1="3"
                                                                y1="22"
                                                                x2="21"
                                                                y2="22"
                                                            ></line>
                                                        </svg>
                                                    </button>
                                                    <button
                                                        class="btn btn-sm btn-square btn-error brightness-105 m-1"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            removeUserProfile(index, true);
                                                        }}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            class="h-5 w-5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M6 18L18 6M6 6l12 12"
                                                            />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="flex flex-col ml-2 grow items-center sm:ml-1">
                        <div class="font-bold sm:text-lg xl:text-xl 2xl:text-2xl text-info mb-5">
                            DANH SÁCH HỒ SƠ CHỜ
                        </div>
                        <div class="w-full h-[520px] overflow-x-hidden overflow-y-scroll no-scrollbar bg-base-100">
                            <table class="table">
                                <thead class="sticky top-0 bg-white z-10">
                                    <tr>
                                        <th class="font-bold text-red-500 sm:text-sm xl:text-base 2xl:text-base">
                                            STT
                                        </th>
                                        <th class="font-bold text-red-500 sm:text-sm xl:text-base 2xl:text-base">
                                            Tên tài khoản
                                        </th>
                                        <th class="font-bold text-red-500 sm:text-sm xl:text-base 2xl:text-base">
                                            Vai trò
                                        </th>
                                        <th class="font-bold text-red-500 sm:text-sm xl:text-base 2xl:text-base text-center">
                                            Xác nhận
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {newProfileData.map((obj, index) => {
                                        return (
                                            <tr
                                                class="hover cursor-pointer"
                                                onClick={() => {
                                                    showUserProfile(index, false);
                                                }}
                                            >
                                                <td>{index + 1}</td>
                                                <td>{obj.userName}</td>
                                                <td>{toTitleCase(obj.role)}</td>
                                                <td class="text-center">
                                                    <button class="btn btn-sm btn-square btn-success brightness-125 m-1">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            class="h-5 w-5"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="#000000"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        >
                                                            <polyline points="20 6 9 17 4 12"></polyline>
                                                        </svg>
                                                    </button>
                                                    <button
                                                        class="btn btn-sm btn-square btn-error brightness-105 m-1"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            removeNewUserProfile(index, false);
                                                        }}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            class="h-5 w-5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M6 18L18 6M6 6l12 12"
                                                            />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div
                    class="backdrop-blur-sm w-full h-full absolute top-0 z-20 cursor-pointer layer-blur layer-hidden"
                    onClick={hideUserProfile}
                ></div>
                <div class="card lg:card-side bg-base-200 shadow-2xl sm:w-[65%] xl:w-[55%] 2xl:w-[55%] absolute top-[20%] sm:left-[22%] xl:left-[24%] 2xl:left-[24%] z-20 user-profile layer-hidden">
                    <figure class="w-1/2">
                        <img class="object-cover" src={avatar} alt="Album" />
                    </figure>
                    <div class="card-body">
                        <div class="flex flex-col items-center mb-5">
                            <div class="font-bold sm:text-lg xl:text-xl 2xl:text-2xl text-red-500">
                                {currentProfile.userName}
                            </div>
                            <div class="badge badge-info">
                                {currentProfile.role === undefined
                                    ? ""
                                    : toTitleCase(currentProfile.role)}
                            </div>
                        </div>
                        <div class="flex sm:text-base xl:text-lg 2xl:text-xl">
                            <div>Họ và tên:&nbsp;</div>
                            <div>
                                {currentProfile.fullName === undefined
                                    ? ""
                                    : toTitleCase(currentProfile.fullName)}
                            </div>
                        </div>
                        <div class="flex sm:text-base xl:text-lg 2xl:text-xl">
                            <div>Email:&nbsp;</div>
                            <div>{currentProfile.email}</div>
                        </div>
                        <div class="flex sm:text-base xl:text-lg 2xl:text-xl">
                            <div>Số điện thoại:&nbsp;</div>
                            <div>{currentProfile.phoneNumber}</div>
                        </div>
                        <div class="flex sm:text-base xl:text-lg 2xl:text-xl">
                            <div>Giới tính:&nbsp;</div>
                            <div>{currentProfile.gender === "male" ? "Nam" : "Nữ"}</div>
                        </div>
                        <div class="flex sm:text-base xl:text-lg 2xl:text-xl">
                            <div>Tài khoản Facebook:&nbsp;</div>
                            <div>{currentProfile.accountFacebook}</div>
                        </div>
                        <div class="flex sm:text-base xl:text-lg 2xl:text-xl">
                            <div>Ngày sinh:&nbsp;</div>
                            <div>{currentProfile.dayOfBirth}</div>
                        </div>
                    </div>
                </div>
                <div class="card bg-base-200 shadow-2xl w-[25%] absolute top-[30%] left-[40%] z-20 remove-profile layer-hidden">
                    <div class="card-body">
                        <div class="font-bold text-center md:text-lg xl:text-xl 2xl:text-2xl text-red-500">
                            Xóa người dùng ?
                        </div>
                        <p class="md:text-base xl:text-lg 2xl:text-xl mb-5">
                            Thao tác này sẽ vĩnh viễn xóa thông tin của người dùng.
                        </p>
                        <div class="card-actions justify-center">
                            <button
                                class="btn btn-error brightness-105 text-white"
                                onClick={() => {
                                    confirmRemove();
                                    hideUserProfile();
                                }}
                            >
                                Xóa ngay
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card bg-base-200 shadow-2xl w-[25%] absolute top-[30%] left-[40%] z-20 remove-new-profile layer-hidden">
                    <div class="card-body">
                        <div class="font-bold text-center md:text-lg xl:text-xl 2xl:text-2xl text-red-500">
                            Xóa hồ sơ ?
                        </div>
                        <p class="md:text-base xl:text-lg 2xl:text-xl mb-5">
                            Thao tác này sẽ vĩnh viễn xóa hồ sơ của người dùng.
                        </p>
                        <div class="card-actions justify-center">
                            <button
                                class="btn btn-error brightness-105 text-white"
                                onClick={() => {
                                    confirmRemove();
                                    hideUserProfile();
                                }}
                            >
                                Xóa ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="lg:hidden">
                <div class="flex flex-col w-full p-5">
                    <div class="flex flex-col items-center">
                        <div class="font-bold text-lg sm:text-xl text-info mb-5">
                            DANH SÁCH NGƯỜI DÙNG
                        </div>
                        <div class="w-full h-[500px] overflow-x-hidden overflow-y-scroll no-scrollbar bg-base-100 mb-5">
                            <table class="table">
                                <thead class="sticky top-0 bg-white z-10">
                                    <tr>
                                        <th class="font-bold text-red-500 text-base">STT</th>
                                        <th class="font-bold text-red-500 text-base">
                                            Tên tài khoản
                                        </th>
                                        <th class="font-bold text-red-500 text-base">Vai trò</th>
                                        <th class="font-bold text-red-500 text-base text-center">
                                            Chỉnh sửa
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {profileData.map((obj, index) => {
                                        return (
                                            <tr
                                                class="hover cursor-pointer"
                                                onClick={() => {
                                                    showUserProfile(index, true);
                                                }}
                                            >
                                                <td class="text-sm">{index + 1}</td>
                                                <td class="text-sm">{obj.userName}</td>
                                                <td class="text-sm">{toTitleCase(obj.role)}</td>
                                                <td class="text-center">
                                                    <button class="btn btn-xs btn-square btn-info brightness-200 m-1">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            class="h-4 w-4"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="#000000"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        >
                                                            <polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon>
                                                            <line
                                                                x1="3"
                                                                y1="22"
                                                                x2="21"
                                                                y2="22"
                                                            ></line>
                                                        </svg>
                                                    </button>
                                                    <button
                                                        class="btn btn-xs btn-square btn-error brightness-105 m-1"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            removeUserProfile(index, true);
                                                        }}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            class="h-4 w-4"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M6 18L18 6M6 6l12 12"
                                                            />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="flex flex-col grow items-center">
                        <div class="font-bold text-lg sm:text-xl text-info mb-5">
                            DANH SÁCH HỒ SƠ CHỜ
                        </div>
                        <div class="w-full h-[500px] overflow-x-hidden overflow-y-scroll no-scrollbar bg-base-100">
                            <table class="table">
                                <thead class="sticky top-0 bg-white z-10">
                                    <tr>
                                        <th class="font-bold text-red-500 text-base">STT</th>
                                        <th class="font-bold text-red-500 text-base">
                                            Tên tài khoản
                                        </th>
                                        <th class="font-bold text-red-500 text-base">Vai trò</th>
                                        <th class="font-bold text-red-500 text-base text-center">
                                            Xác nhận
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {newProfileData.map((obj, index) => {
                                        return (
                                            <tr
                                                class="hover cursor-pointer"
                                                onClick={() => {
                                                    showNewUserProfile(index);
                                                }}
                                            >
                                                <td class="text-sm">{index + 1}</td>
                                                <td class="text-sm">{obj.userName}</td>
                                                <td class="text-sm">{toTitleCase(obj.role)}</td>
                                                <td class="text-center">
                                                    <button class="btn btn-xs btn-square btn-success brightness-125 m-1">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            class="h-4 w-4"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="#000000"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        >
                                                            <polyline points="20 6 9 17 4 12"></polyline>
                                                        </svg>
                                                    </button>
                                                    <button
                                                        class="btn btn-xs btn-square btn-error brightness-105 m-1"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            removeNewUserProfile(index, false);
                                                        }}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            class="h-4 w-4"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M6 18L18 6M6 6l12 12"
                                                            />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div
                    class="backdrop-blur-sm w-full h-[1000px] absolute top-0 z-20 cursor-pointer layer-blur layer-hidden"
                    onClick={hideUserProfile}
                ></div>
                <div class="card card-side bg-base-200 shadow-2xl max-w-[60%] absolute top-[35%] sm:top-[30%] md:top-[28%] left-[20%] z-20 user-profile layer-hidden">
                    <div class="card-body p-0">
                        <div class="flex w-full items-center">
                            <figure class="w-1/2">
                                <img class="object-cover" src={avatar} alt="Album" />
                            </figure>
                            <div class="flex flex-col items-center w-1/2">
                                <div class="font-bold text-lg sm:text-xl md:text-2xl text-red-500">
                                    {currentProfile.userName}
                                </div>
                                <div class="badge badge-info">
                                    {currentProfile.role === undefined
                                        ? ""
                                        : toTitleCase(currentProfile.role)}
                                </div>
                            </div>
                        </div>
                        <div class="p-4 flex flex-col sm:items-center">
                            <div class="flex text-base sm:text-lg md:text-xl">
                                <div>Họ và tên:&nbsp;</div>
                                <div>
                                    {currentProfile.fullName === undefined
                                        ? ""
                                        : toTitleCase(currentProfile.fullName)}
                                </div>
                            </div>
                            <div class="flex text-base sm:text-lg md:text-xl">
                                <div>Email:&nbsp;</div>
                                <div>{currentProfile.email}</div>
                            </div>
                            <div class="flex text-base sm:text-lg md:text-xl">
                                <div>Số điện thoại:&nbsp;</div>
                                <div>{currentProfile.phoneNumber}</div>
                            </div>
                            <div class="flex text-base sm:text-lg md:text-xl">
                                <div>Giới tính:&nbsp;</div>
                                <div>{currentProfile.gender === "male" ? "Nam" : "Nữ"}</div>
                            </div>
                            <div class="flex text-base sm:text-lg md:text-xl">
                                <div>Tài khoản Facebook:&nbsp;</div>
                                <div>{currentProfile.accountFacebook}</div>
                            </div>
                            <div class="flex text-base sm:text-lg md:text-xl">
                                <div>Ngày sinh:&nbsp;</div>
                                <div>{currentProfile.dayOfBirth}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card lg:card-side bg-base-200 shadow-2xl w-[60%] absolute top-[115%] sm:top-[110%] md:top-[108%] left-[20%] z-20 new-user-profile layer-hidden">
                    <div class="card-body p-0">
                        <div class="flex w-full items-center">
                            <figure class="w-1/2">
                                <img class="object-cover" src={avatar} alt="Album" />
                            </figure>
                            <div class="flex flex-col items-center w-1/2">
                                <div class="font-bold text-base sm:text-xl md:text-2xl text-red-500">
                                    {currentProfile.userName}
                                </div>
                                <div class="badge badge-info">
                                    {currentProfile.role === undefined
                                        ? ""
                                        : toTitleCase(currentProfile.role)}
                                </div>
                            </div>
                        </div>
                        <div class="p-4 flex flex-col sm:items-center">
                            <div class="flex text-base sm:text-lg md:text-xl">
                                <div>Họ và tên:&nbsp;</div>
                                <div>
                                    {currentProfile.fullName === undefined
                                        ? ""
                                        : toTitleCase(currentProfile.fullName)}
                                </div>
                            </div>
                            <div class="flex text-base sm:text-lg md:text-xl">
                                <div>Email:&nbsp;</div>
                                <div>{currentProfile.email}</div>
                            </div>
                            <div class="flex text-base sm:text-lg md:text-xl">
                                <div>Số điện thoại:&nbsp;</div>
                                <div>{currentProfile.phoneNumber}</div>
                            </div>
                            <div class="flex text-base sm:text-lg md:text-xl">
                                <div>Giới tính:&nbsp;</div>
                                <div>{currentProfile.gender === "male" ? "Nam" : "Nữ"}</div>
                            </div>
                            <div class="flex text-base sm:text-lg md:text-xl">
                                <div>Tài khoản Facebook:&nbsp;</div>
                                <div>{currentProfile.accountFacebook}</div>
                            </div>
                            <div class="flex text-base sm:text-lg md:text-xl">
                                <div>Ngày sinh:&nbsp;</div>
                                <div>{currentProfile.dayOfBirth}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card bg-base-200 shadow-2xl w-[50%] absolute top-[38%] left-[27%] md:left-[25%] z-20 remove-profile layer-hidden">
                    <div class="card-body">
                        <div class="font-bold text-center text-xl md:text-2xl text-red-500">
                            Xóa người dùng ?
                        </div>
                        <p class="text-base md:text-lg mb-5">
                            Thao tác này sẽ vĩnh viễn xóa thông tin của người dùng.
                        </p>
                        <div class="card-actions justify-center">
                            <button
                                class="btn btn-error brightness-105 text-white"
                                onClick={() => {
                                    confirmRemove();
                                    hideUserProfile();
                                }}
                            >
                                Xóa ngay
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card bg-base-200 shadow-2xl w-[50%] absolute top-[118%] left-[27%] md:left-[25%] z-20 remove-new-profile layer-hidden">
                    <div class="card-body">
                        <div class="font-bold text-center text-xl md:text-2xl text-red-500">
                            Xóa hồ sơ ?
                        </div>
                        <p class="text-base md:text-lg mb-5">
                            Thao tác này sẽ vĩnh viễn xóa hồ sơ của người dùng.
                        </p>
                        <div class="card-actions justify-center">
                            <button
                                class="btn btn-error brightness-105 text-white"
                                onClick={() => {
                                    confirmRemove();
                                    hideUserProfile();
                                }}
                            >
                                Xóa ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserManage;
