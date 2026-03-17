import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../config/axios";
import { useDebounce } from "../hooks";
import { ArrowPathIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function SearchUsernameInput() {

    const [search, setSearch] = useState("");

    type DatabaseUsernames = {
        usernames: [
            { username: string }
        ]
    }

    const debounced = useDebounce(search, 400)

    const { data: usernames, isLoading } = useQuery<DatabaseUsernames>({
        queryKey: ['usernames', debounced],
        queryFn: () => searchUsers(debounced),
        retry: 1,
        refetchOnWindowFocus: false,
        enabled: debounced.length > 1
    });

    const searchUsers = async (username: string) => {
        const { data } = await api.get(
            `/users/${username}`
        )
        return data
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-row gap-3">
                <MagnifyingGlassIcon width={20} className="ml-10"/>
                <input
                    type="text"
                    className="border-b-2 border-b-gray-300 p-2 focus:bg-gray-100"
                    placeholder="Search username profile."
                    value={search}
                    onChange={handleInputChange}
                />
                <XMarkIcon width={20} onClick={() => setSearch('')} className="cursor-pointer" />
            </div>
            <div
                className={`transition-opacity
                    duration-700 ${usernames ? 'opacity-100' : 'opacity-0'} flex flex-col`
                }
            >
                {isLoading && (
                    <div className="flex justify-center mt-5 animate-spin w-fit">
                        <ArrowPathIcon width={20} />
                    </div>
                )}
                {usernames ?
                    usernames.usernames.map(user => (
                        <Link
                            to={`/${user.username}`}
                            key={user.username}
                            className="bg-gray-100 p-2 rounded mt-1 cursor-pointer 
                                    text-center hover:bg-gray-200"
                        >
                            {user.username}
                        </Link>))
                    :
                    <p></p>}
            </div>
        </div>
    )
}
