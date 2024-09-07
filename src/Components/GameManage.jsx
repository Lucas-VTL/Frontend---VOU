import React, { useEffect, useState } from "react";
import gameData from "../utils/jsonFiles/gameData.json";
import avatar from "../utils/images/ava.jpg";
import "../Styles/Manage.css";

function GameManage() {
    const [gameProfile, setGameProfile] = useState([]);
    const [currentGameProfile, setCurrentGameProfile] = useState({});
    const [updateData, setUpdateData] = useState(0);
    const [smallUpdateData, setSmallUpdateData] = useState(0);

    const toTitleCase = (phrase) => {
        return phrase
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    const inputFill = (titleName, titleInput) => {
        if (titleName !== "") {
            var titleValue = document.querySelector(titleName);
            var inputValue = document.querySelector(titleInput);

            if (inputValue.value !== "") {
                if (inputValue.placeholder !== inputValue.value) {
                    titleValue.style.color = "rgb(242, 82, 82)";
                } else {
                    titleValue.style.color = "black";
                }
            } else {
                titleValue.style.color = "black";
            }
        }
    };

    const hideUserProfile = () => {
        const layerBlur = document.querySelectorAll(".layer-blur");
        const removeProfile = document.querySelectorAll(".remove-profile");
        const editProfile = document.querySelectorAll(".edit-profile");

        layerBlur.forEach((layer) => {
            layer.classList.remove("layer-show");
            layer.classList.add("layer-hidden");
        });

        removeProfile.forEach((layer) => {
            layer.classList.remove("layer-show");
            layer.classList.add("layer-hidden");
        });

        editProfile.forEach((layer) => {
            layer.classList.remove("layer-show");
            layer.classList.add("layer-hidden");
        });

        var allInputList = [
            ".name-input",
            ".type-input",
            ".itemSwap-input",
            ".instruction-input",
            ".small-name-input",
            ".small-type-input",
            ".small-itemSwap-input",
            ".small-instruction-input",
        ];

        allInputList.forEach((input) => {
            var inputValue = document.querySelector(input);
            inputValue.value = "";
        });
    };

    const removeGameProfile = (profileIndex, status) => {
        const layerBlur = document.querySelectorAll(".layer-blur");
        const removeProfile = document.querySelectorAll(".remove-profile");

        layerBlur.forEach((layer) => {
            layer.classList.remove("layer-hidden");
            layer.classList.add("layer-show");
        });

        removeProfile.forEach((layer) => {
            layer.classList.remove("layer-hidden");
            layer.classList.add("layer-show");
        });

        var count = -1;

        gameProfile.forEach((item) => {
            if (item.status === status.toString()) {
                if (++count === profileIndex) {
                    setCurrentGameProfile(item);
                }
            }
        });
    };

    const confirmRemove = () => {
        var gameList = [];

        gameProfile.forEach((item) => {
            if (item.id !== currentGameProfile.id) {
                gameList.push(item);
            }
        });

        setGameProfile(gameList);
        hideUserProfile();
    };

    const editGameProfile = (profileIndex) => {
        const layerBlur = document.querySelectorAll(".layer-blur");
        const editProfile = document.querySelectorAll(".edit-profile");

        layerBlur.forEach((layer) => {
            layer.classList.remove("layer-hidden");
            layer.classList.add("layer-show");
        });

        editProfile.forEach((layer) => {
            layer.classList.remove("layer-hidden");
            layer.classList.add("layer-show");
        });

        gameProfile.forEach((item, index) => {
            if (index === profileIndex) {
                setCurrentGameProfile(item);
            }
        });

        const titleList = [".type-title", ".itemSwap-title", ".instruction-title"];

        titleList.forEach((title) => {
            var titleName = document.querySelector(title);
            titleName.style.color = "black";
        });
    };

    const confirmSave = (buttonSize) => {
        var valueList = [];

        if (buttonSize === "large") {
            const inputList = [
                ".name-input",
                ".type-input",
                ".itemSwap-input",
                ".instruction-input",
            ];

            inputList.forEach((input) => {
                var inputValue = document.querySelector(input);
                if (inputValue.value !== "") {
                    valueList.push(inputValue.value);
                } else {
                    valueList.push(inputValue.placeholder);
                }
            });
        } else {
            const inputList = [
                ".small-name-input",
                ".small-type-input",
                ".small-itemSwap-input",
                ".small-instruction-input",
            ];

            inputList.forEach((input) => {
                var inputValue = document.querySelector(input);
                if (inputValue.value !== "") {
                    valueList.push(inputValue.value);
                } else {
                    valueList.push(inputValue.placeholder);
                }
            });
        }

        const titleList = [".type-title", ".itemSwap-title", ".instruction-title"];

        titleList.forEach((title) => {
            var titleName = document.querySelector(title);
            titleName.style.color = "black";
        });
    };

    useEffect(() => {
        var gameList = [];
        var keys = Object.keys(gameData);
        keys.forEach(function (key) {
            gameList.push(gameData[key]);
        });

        setGameProfile(gameList);

        const inputList = [".name-input", ".type-input", ".itemSwap-input", ".instruction-input"];

        var count = 0;

        inputList.forEach((input) => {
            var inputValue = document.querySelector(input);
            if (inputValue.value !== "") {
                if (inputValue.placeholder !== inputValue.value) {
                    count += 1;
                }
            }
        });

        setUpdateData(count);

        var saveButton = document.querySelector(".save-button");

        if (updateData > 0) {
            saveButton.classList.remove("btn-disabled");
        } else {
            saveButton.classList.add("btn-disabled");
        }

        const smallInputList = [
            ".small-name-input",
            ".small-type-input",
            ".small-itemSwap-input",
            ".small-instruction-input",
        ];

        var smallCount = 0;

        smallInputList.forEach((input) => {
            var inputValue = document.querySelector(input);
            if (inputValue.value !== "") {
                if (inputValue.placeholder !== inputValue.value) {
                    smallCount += 1;
                }
            }
        });

        setSmallUpdateData(smallCount);

        var smallSaveButton = document.querySelector(".small-save-button");

        if (smallUpdateData > 0) {
            smallSaveButton.classList.remove("btn-disabled");
        } else {
            smallSaveButton.classList.add("btn-disabled");
        }

        return () => {};
    }, [gameProfile, currentGameProfile]);

    return (
        <div class="bg-white font-Kanit" data-theme="retro">
            <div class="lg:block hidden">
                <div class="w-full p-5 text-center">
                    <div class="font-bold sm:text-lg xl:text-xl 2xl:text-2xl text-info mb-5">
                        DANH SÁCH TRÒ CHƠI
                    </div>
                    <div class="w-full h-[500px] overflow-x-hidden overflow-y-scroll no-scrollbar bg-base-100">
                        <table class="table">
                            <thead class="sticky top-0 bg-white z-10">
                                <tr>
                                    <th class="font-bold text-red-500 sm:text-sm xl:text-base 2xl:text-base ">
                                        STT
                                    </th>
                                    <th class="font-bold text-red-500 sm:text-sm xl:text-base 2xl:text-base text-center">
                                        Hình ảnh
                                    </th>
                                    <th class="font-bold text-red-500 sm:text-sm xl:text-base 2xl:text-base">
                                        Tên trò chơi
                                    </th>
                                    <th class="font-bold text-red-500 sm:text-sm xl:text-base 2xl:text-base w-[10%]">
                                        Thể loại
                                    </th>
                                    <th class="font-bold text-red-500 sm:text-sm xl:text-base 2xl:text-base">
                                        Đổi vật phẩm
                                    </th>
                                    <th class="font-bold text-red-500 sm:text-sm xl:text-base 2xl:text-base text-center w-[60%]">
                                        Hướng dẫn trò chơi
                                    </th>
                                    <th class="font-bold text-red-500 sm:text-sm xl:text-base 2xl:text-base text-center w-[10%]">
                                        Chỉnh sửa
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {gameProfile.map((obj, index) => {
                                    return (
                                        <tr class="hover">
                                            <td>{index + 1}</td>
                                            <td>
                                                <img class="object-fill" src={avatar} alt="Album" />
                                            </td>
                                            <td>{toTitleCase(obj.name)}</td>
                                            <td>{toTitleCase(obj.type)}</td>
                                            <td>{obj.itemSwap ? "Có áp dụng" : "Không áp dụng"}</td>
                                            <td>{obj.instruction}</td>
                                            <td class="text-center">
                                                <button
                                                    class="btn btn-sm btn-square btn-info brightness-200 m-1"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        editGameProfile(index);
                                                    }}
                                                >
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
                                                        <line x1="3" y1="22" x2="21" y2="22"></line>
                                                    </svg>
                                                </button>
                                                <button
                                                    class="btn btn-sm btn-square btn-error brightness-105 m-1"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeGameProfile(index, true);
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
                    <div
                        class="backdrop-blur-sm w-full h-full absolute top-0 left-0 z-20 cursor-pointer layer-blur layer-hidden"
                        onClick={hideUserProfile}
                    ></div>
                    <div class="card bg-base-200 shadow-2xl w-[25%] absolute top-[30%] left-[40%] z-20 remove-profile layer-hidden">
                        <div class="card-body">
                            <div class="font-bold text-center md:text-lg xl:text-xl 2xl:text-2xl text-red-500">
                                Xóa trò chơi ?
                            </div>
                            <p class="md:text-base xl:text-lg 2xl:text-xl mb-5">
                                Thao tác này sẽ vĩnh viễn xóa thông tin của trò chơi.
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
                    <div class="card lg:card-side bg-base-200 shadow-2xl sm:w-[65%] xl:w-[55%] 2xl:w-[55%] absolute top-[20%] sm:left-[22%] xl:left-[24%] 2xl:left-[24%] z-20 edit-profile layer-hidden">
                        <button
                            className="save-button btn btn-circle btn-success btn-disabled brightness-125 absolute sm:top-[83%] sm:left-[91%] xl:top-[84%%] xl:left-[92%] 2xl:top-[85%] 2xl:left-[93%]"
                            onClick={() => {
                                confirmSave("large");
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#ffffff"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                                <polyline points="7 3 7 8 15 8"></polyline>
                            </svg>
                        </button>
                        <figure class="w-1/2">
                            <img class="object-cover" src={avatar} alt="Album" />
                        </figure>
                        <div class="card-body">
                            <div class="flex flex-col items-center mb-5">
                                <div class="font-bold sm:text-lg xl:text-xl 2xl:text-2xl text-red-500">
                                    <input
                                        type="text"
                                        placeholder={
                                            currentGameProfile.name === undefined
                                                ? ""
                                                : toTitleCase(currentGameProfile.name)
                                        }
                                        class="name-input input input-ghost text-center font-bold sm:text-lg xl:text-xl 2xl:text-2xl placeholder-red-500"
                                        onKeyUp={() => {
                                            inputFill("", ".name-input");
                                        }}
                                    />
                                </div>
                            </div>
                            <div class="flex sm:text-base xl:text-lg 2xl:text-xl">
                                <div class="type-title flex-none">Thể loại:&nbsp;</div>
                                <input
                                    type="text"
                                    placeholder={
                                        currentGameProfile.type === undefined
                                            ? ""
                                            : toTitleCase(currentGameProfile.type)
                                    }
                                    class="type-input input input-ghost sm:text-base xl:text-lg 2xl:text-xl whitespace-nowrap p-0 h-7 placeholder-black"
                                    onKeyUp={() => {
                                        inputFill(".type-title", ".type-input");
                                    }}
                                />
                            </div>
                            <div class="flex sm:text-base xl:text-lg 2xl:text-xl">
                                <div class="itemSwap-title flex-none">
                                    Áp dụng đổi vật phẩm:&nbsp;
                                </div>
                                <input
                                    type="text"
                                    placeholder={currentGameProfile.itemSwap ? "Có" : "Không"}
                                    class="itemSwap-input input input-ghost sm:text-base xl:text-lg 2xl:text-xl whitespace-nowrap p-0 h-7 w-full placeholder-black"
                                    onKeyUp={() => {
                                        inputFill(".itemSwap-title", ".itemSwap-input");
                                    }}
                                />
                            </div>
                            <div class="flex flex-col sm:text-base xl:text-lg 2xl:text-xl">
                                <div class="instruction-title flex-none text-left">
                                    Hướng dân trò chơi:&nbsp;
                                </div>
                                <textarea
                                    type="text"
                                    placeholder={currentGameProfile.instruction}
                                    class="instruction-input input input-ghost sm:text-base xl:text-lg 2xl:text-xl p-0 placeholder-black h-36 w-full overflow-x-hidden"
                                    onKeyUp={() => {
                                        inputFill(".instruction-title", ".instruction-input");
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="lg:hidden">
                <div class="flex flex-col items-center p-5">
                    <div class="font-bold text-lg sm:text-xl text-info mb-5">
                        DANH SÁCH NGƯỜI DÙNG
                    </div>
                    <div class="w-full h-[500px] overflow-x-hidden overflow-y-scroll no-scrollbar bg-base-100 mb-5">
                        <table class="table">
                            <thead class="sticky top-0 bg-white z-10">
                                <tr>
                                    <th class="font-bold text-red-500 text-base">STT</th>
                                    <th class="font-bold text-red-500 text-base">Tên trò chơi</th>
                                    <th class="font-bold text-red-500 text-base">Thể loại</th>
                                    <th class="font-bold text-red-500 text-base text-center">
                                        Chỉnh sửa
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {gameProfile.map((obj, index) => {
                                    return (
                                        <tr class="hover">
                                            <td>{index + 1}</td>
                                            <td>{toTitleCase(obj.name)}</td>
                                            <td>{toTitleCase(obj.type)}</td>
                                            <td class="text-center">
                                                <button
                                                    class="btn btn-xs btn-square btn-info brightness-200 m-1"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        editGameProfile(index);
                                                    }}
                                                >
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
                                                        <line x1="3" y1="22" x2="21" y2="22"></line>
                                                    </svg>
                                                </button>
                                                <button
                                                    class="btn btn-xs btn-square btn-error brightness-105 m-1"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeGameProfile(index, true);
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
                    <div
                        class="backdrop-blur-sm w-full h-[500px] absolute top-0 z-20 cursor-pointer layer-blur layer-hidden"
                        onClick={hideUserProfile}
                    ></div>
                    <div class="card bg-base-200 shadow-2xl w-[50%] absolute top-[38%] left-[27%] md:left-[25%] z-20 remove-profile layer-hidden">
                        <div class="card-body">
                            <div class="font-bold text-center text-xl md:text-2xl text-red-500">
                                Xóa trò chơi ?
                            </div>
                            <p class="text-base md:text-lg mb-5">
                                Thao tác này sẽ vĩnh viễn xóa thông tin của trò chơi.
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
                    <div class="card card-side bg-base-200 shadow-2xl max-w-[60%] absolute top-[25%] sm:top-[20%] md:top-[15%] left-[20%] z-20 edit-profile layer-hidden">
                        <div class="card-body p-0">
                            <div class="flex w-full items-center">
                                <figure class="w-1/2">
                                    <img class="object-cover" src={avatar} alt="Album" />
                                </figure>
                                <div class="flex flex-col items-center w-1/2 mx-2">
                                    <div class="font-bold text-lg sm:text-xl md:text-2xl text-red-500">
                                        <input
                                            type="text"
                                            placeholder={
                                                currentGameProfile.name === undefined
                                                    ? ""
                                                    : toTitleCase(currentGameProfile.name)
                                            }
                                            class="small-name-input input w-full input-ghost text-center font-bold text-lg sm:text-xl md:text-2xl placeholder-red-500"
                                            onKeyUp={() => {
                                                inputFill("", ".small-name-input");
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="p-4 flex flex-col">
                                <div class="flex text-base sm:text-lg md:text-xl">
                                    <div class="small-type-title flex-none sm:text-lg md:text-xl">
                                        Thể loại:&nbsp;
                                    </div>
                                    <input
                                        type="text"
                                        placeholder={
                                            currentGameProfile.type === undefined
                                                ? ""
                                                : toTitleCase(currentGameProfile.type)
                                        }
                                        class="small-type-input input input-ghost sm:text-lg md:text-xl whitespace-nowrap p-0 h-6 placeholder-black"
                                        onKeyUp={() => {
                                            inputFill(".small-type-title", ".small-type-input");
                                        }}
                                    />
                                </div>
                                <div class="flex text-base sm:text-lg md:text-xl">
                                    <div class="small-itemSwap-title flex-none sm:text-lg md:text-xl">
                                        Áp dụng đổi vật phẩm:&nbsp;
                                    </div>
                                    <input
                                        type="text"
                                        placeholder={currentGameProfile.itemSwap ? "Có" : "Không"}
                                        class="small-itemSwap-input input input-ghost sm:text-lg md:text-xl whitespace-nowrap p-0 h-6 placeholder-black w-full"
                                        onKeyUp={() => {
                                            inputFill(
                                                ".small-itemSwap-title",
                                                ".small-itemSwap-input"
                                            );
                                        }}
                                    />
                                </div>
                                <div class="flex flex-col text-base sm:text-lg md:text-xl">
                                    <div class="small-instruction-title flex-none sm:text-lg md:text-xl">
                                        Hướng dẫn trò chơi:&nbsp;
                                    </div>
                                    <textarea
                                        type="text"
                                        placeholder={currentGameProfile.instruction}
                                        class="small-instruction-input input input-ghost sm:text-lg md:text-xl p-0 placeholder-black overflow-x-hidden h-20 w-full"
                                        onKeyUp={() => {
                                            inputFill(
                                                ".small-instruction-title",
                                                ".small-instruction-input"
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                            <button
                                className="small-save-button btn btn-success btn-disabled brightness-125"
                                onClick={() => {
                                    confirmSave("small");
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#ffffff"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                                    <polyline points="17 21 17 13 7 13 7 21"></polyline>
                                    <polyline points="7 3 7 8 15 8"></polyline>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameManage;
