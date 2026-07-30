import type { ReactNode } from "react";

interface SectionHeaderProps {

    title: string;

    description?: string;

    actions?: ReactNode;

}

const SectionHeader = ({
    title,
    description,
    actions,
}: SectionHeaderProps) => {

    return (

        <div
            className="
                mb-6
                flex
                flex-col
                gap-4
                md:flex-row
                md:items-center
                md:justify-between
            "
        >

            <div>

                <h2
                    className="
                        text-2xl
                        font-bold
                        text-gray-900
                    "
                >
                    {title}
                </h2>

                {description && (

                    <p
                        className="
                            mt-1
                            text-sm
                            text-gray-500
                        "
                    >
                        {description}
                    </p>

                )}

            </div>

            {actions && (

                <div
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >

                    {actions}

                </div>

            )}

        </div>

    );

};

export default SectionHeader;