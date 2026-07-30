import type { ReactNode } from "react";

interface ChartCardProps {

    title: string;

    subtitle?: string;

    actions?: ReactNode;

    children: ReactNode;

    className?: string;

}

const ChartCard = ({
    title,
    subtitle,
    actions,
    children,
    className = "",
}: ChartCardProps) => {

    return (

        <div
            className={`
                rounded-xl
                border
                border-gray-200
                bg-white
                shadow-sm
                transition-shadow
                duration-200
                hover:shadow-md
                ${className}
            `}
        >

            <div
                className="
                    flex
                    items-start
                    justify-between
                    border-b
                    border-gray-100
                    px-6
                    py-5
                "
            >

                <div>

                    <h3
                        className="
                            text-lg
                            font-semibold
                            text-gray-900
                        "
                    >
                        {title}
                    </h3>

                    {subtitle && (

                        <p
                            className="
                                mt-1
                                text-sm
                                text-gray-500
                            "
                        >
                            {subtitle}
                        </p>

                    )}

                </div>

                {actions && (

                    <div>

                        {actions}

                    </div>

                )}

            </div>

            <div className="p-6">

                {children}

            </div>

        </div>

    );

};

export default ChartCard;