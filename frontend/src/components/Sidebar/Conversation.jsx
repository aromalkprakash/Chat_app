import React from 'react';
import { useQuery } from "@tanstack/react-query";

const Conversation = () => {
    const { data: usersList, isLoading } = useQuery({
        queryKey: ["suggestedUsers"],
        queryFn: async () => {
            const res = await fetch("/api/users/list");
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Something went wrong");
            }
            return data;
        },
    });

    if (isLoading) return <div>Loading...</div>;

    if (usersList?.length === 0) return <div className='md:w-64 w-0'></div>;

    return (
        <>
            <div class="overflow-auto ...">
            {usersList?.map((user, index) => (
                <React.Fragment key={user._id}>
                    <div className='flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer'>
                        <div className='avatar online'>
                            <div className='w-12 rounded-full'>
                                <img
                                    src={user.profilePic}
                                    alt='user avatar'
                                />
                            </div>
                        </div>

                        <div className='flex flex-col flex-1'>
                            <div className='flex gap-3 justify-between'>
                                <p className='font-bold text-gray-200'>{user.fullName}</p>
                                <span className='text-xl'>🎃</span>
                            </div>
                        </div>
                    </div>
                    {index < usersList.length - 1 && <div className='divider my-0 py-0 h-1' />}
                </React.Fragment>
            ))};
                </div>
        </>
    );
};

export default Conversation;
