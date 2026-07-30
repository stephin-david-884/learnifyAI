import type { UserAnalytics } from "../../../../../types/admin/analytics";
import ChartCard from "../common/ChartCard";
import SectionHeader from "../common/SectionHeader";


interface UserSectionProps {
    users: UserAnalytics | null;
    loading?: boolean;
}

const UserSection = ({
    users,
    loading = false,
}: UserSectionProps) => {

    if (loading) {

        return (

            <section className="space-y-6">

                <SectionHeader
                    title="User Analytics"
                    description="Monitor user registrations and account distribution."
                />

                <div className="grid gap-6 lg:grid-cols-2">

                    {Array.from({ length: 2 }).map((_, index) => (

                        <div
                            key={index}
                            className="
                                h-96
                                animate-pulse
                                rounded-xl
                                border
                                border-gray-200
                                bg-gray-100
                            "
                        />

                    ))}

                </div>

            </section>

        );

    }

    if (!users) {

        return (

            <section className="space-y-6">

                <SectionHeader
                    title="User Analytics"
                    description="Monitor user registrations and account distribution."
                />

                <ChartCard title="User Analytics">

                    <div
                        className="
                            flex
                            h-72
                            items-center
                            justify-center
                            text-gray-500
                        "
                    >
                        No user analytics available.
                    </div>

                </ChartCard>

            </section>

        );

    }

    return (

        <section className="space-y-6">

            <SectionHeader
                title="User Analytics"
                description="Track user registrations, growth and subscription distribution."
            />

            <div className="grid gap-6 lg:grid-cols-2">

                <ChartCard
                    title="User Registrations"
                    subtitle="Daily user registrations for the selected period."
                >

                    {/* UserRegistrationChart */}

                    <div
                        className="
                            flex
                            h-72
                            items-center
                            justify-center
                            rounded-lg
                            border-2
                            border-dashed
                            border-gray-200
                            text-gray-400
                        "
                    >
                        UserRegistrationChart
                    </div>

                </ChartCard>

                <ChartCard
                    title="User Overview"
                    subtitle="Current user distribution."
                >

                    {/* User Overview Cards */}

                    <div className="grid grid-cols-2 gap-4">

                        <div className="rounded-lg border border-gray-200 p-4">

                            <p className="text-sm text-gray-500">
                                Total Users
                            </p>

                            <p className="mt-2 text-2xl font-bold text-gray-900">
                                {users.overview.totalUsers}
                            </p>

                        </div>

                        <div className="rounded-lg border border-gray-200 p-4">

                            <p className="text-sm text-gray-500">
                                Free Users
                            </p>

                            <p className="mt-2 text-2xl font-bold text-gray-900">
                                {users.overview.freeUsers}
                            </p>

                        </div>

                        <div className="rounded-lg border border-gray-200 p-4">

                            <p className="text-sm text-gray-500">
                                Pro Users
                            </p>

                            <p className="mt-2 text-2xl font-bold text-gray-900">
                                {users.overview.proUsers}
                            </p>

                        </div>

                        <div className="rounded-lg border border-gray-200 p-4">

                            <p className="text-sm text-gray-500">
                                Blocked Users
                            </p>

                            <p className="mt-2 text-2xl font-bold text-gray-900">
                                {users.overview.blockedUsers}
                            </p>

                        </div>

                    </div>

                </ChartCard>

            </div>

        </section>

    );

};

export default UserSection;