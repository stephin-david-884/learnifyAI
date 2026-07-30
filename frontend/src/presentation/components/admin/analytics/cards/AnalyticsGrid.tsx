import { type LucideIcon } from "lucide-react";
import AnalyticsCard from "./AnalyticsCard";

export interface AnalyticsCardItem {

    title: string;

    value: string | number;

    icon?: LucideIcon;

    subtitle?: string;

    trend?: number;

}

interface AnalyticsGridProps {

    cards: AnalyticsCardItem[];

    loading?: boolean;

}

const AnalyticsGrid = ({
    cards,
    loading = false,
}: AnalyticsGridProps) => {

    if (loading) {

        return (

            <div
                className="
                    grid
                    gap-5
                    sm:grid-cols-2
                    lg:grid-cols-4
                "
            >

                {Array.from({ length: 8 }).map((_, index) => (

                    <AnalyticsCard

                        key={index}

                        title=""

                        value=""

                        loading

                    />

                ))}

            </div>

        );

    }

    return (

        <div
            className="
                grid
                gap-5
                sm:grid-cols-2
                lg:grid-cols-4
            "
        >

            {cards.map((card) => (

                <AnalyticsCard

                    key={card.title}

                    {...card}

                />

            ))}

        </div>

    );

};

export default AnalyticsGrid;