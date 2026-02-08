import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../config/axios";
import { useDebounce } from "../hooks";

export default function SearchInput() {

    const [search, setSearch] = useState("");

    type DatabaseUsernames = {
        usernames: [
            {username: string}
        ]
    }

    const debounced = useDebounce(search, 400)
    
    const { data:usernames } = useQuery<DatabaseUsernames>({
        queryKey: ['usernames', debounced],
        queryFn: () => searchUsers(debounced),
        retry: 1,
        refetchOnWindowFocus: false,
        enabled: debounced.length > 1
    });

    const searchUsers = async (username: string) => {
        const {data} = await api.get(
            `/users/${username}`
        )
        return data
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    return (
        <div className="flex flex-col">
            <input
                type="text"
                className="border-2 border-gray-200 p-2 rounded"
                placeholder="Search by username..."
                onChange={handleInputChange}
            />
            {usernames ? 
                usernames.usernames.map(user => (
                        <Link to={`/${user.username}`} key={user.username}>
                            {user.username}
                        </Link>
                    )
                ) 
                : 
                <p></p>}
        </div>
    )
}
