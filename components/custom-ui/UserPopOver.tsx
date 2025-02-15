import { Avatar, Button, Col, Popover, Row, Tag, Typography } from "antd";
import { useCurrentUser } from "@/hooks/api/auth/useCurrentUser";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { useState } from "react";
import { logout } from "@/actions/logout";
import { User } from "next-auth";
import { BranchType } from "@/types/entity/branch";

const UserPopOver = (
    {
        currentUser,
        onClickSignOut,
        toggleTheme,
        isDarkMode
    }: {
        currentUser: ({ role: string; branch: BranchType; } & User) | undefined,
        onClickSignOut: () => void,
        toggleTheme: () => void,
        isDarkMode: boolean
    }
) => {
    return (
        <div className="flex flex-col gap-1 px-2 mt-5">
            <Row gutter={50}>
                <Col span={6}>
                    <p>Role:</p>
                </Col>
                <Col span={10}>
                    {
                        currentUser?.role == "admin" ?
                            <Tag color="gold">Admin</Tag> : <Tag color="green">User</Tag>
                    }
                </Col>
            </Row>
            <Row gutter={50}>
                <Col span={6}>
                    <p>Email:</p>
                </Col>
                <Col span={10}>
                    <span>
                        {currentUser?.email}
                    </span>
                </Col>
            </Row>
            <Row gutter={50}>
                <Col span={6}>
                    <p>Branch:</p>
                </Col>
                <Col span={10}>
                    <p>{currentUser?.branch.name}</p>
                </Col>
            </Row>
            <div className="flex flex-row gap-1">
                <Button onClick={onClickSignOut} block>
                    Sign out
                </Button>

                <Button onClick={toggleTheme} block>
                    {isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
                </Button>
            </div>
        </div>
    )
}

const UserAvatar = (
    {
        toggleTheme,
        isDarkMode
    }: {
        toggleTheme: () => void,
        isDarkMode: boolean
    }
) => {
    // User
    const [open, setOpen] = useState(false);

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    const onClickSignOut = () => {
        logout();
    }

    const currentUser = useCurrentUser();

    return (
        <Popover
            content={
                <UserPopOver
                    currentUser={currentUser}
                    onClickSignOut={onClickSignOut}
                    toggleTheme={toggleTheme}
                    isDarkMode={isDarkMode}
                />
            }
            title={currentUser?.name}
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
            placement="bottomRight"
        >
            <Avatar
                size={"large"}
            >
                {currentUser?.name?.charAt(0).toUpperCase()}
            </Avatar>
        </Popover>
    )
}

export default UserAvatar;
