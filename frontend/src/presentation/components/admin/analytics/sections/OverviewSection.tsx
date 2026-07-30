import {
    Bot,
    Crown,
    FileText,
    IndianRupee,
    Users,
} from "lucide-react";

import AnalyticsGrid, {
    type AnalyticsCardItem,
} from "../cards/AnalyticsGrid";
import type { DashboardSummary } from "../../../../../types/admin/analytics";


interface OverviewSectionProps {
    dashboard: DashboardSummary | null;
    loading?: boolean;
}

const OverviewSection = ({
    dashboard,
    loading = false,
}: OverviewSectionProps) => {

    const cards: AnalyticsCardItem[] = dashboard
        ? [
              {
                  title: "Total Users",
                  value: dashboard.users.overview.totalUsers,
                  subtitle: `${dashboard.users.overview.newUsers} new users`,
                  icon: Users,
              },

              {
                  title: "Pro Users",
                  value: dashboard.users.overview.proUsers,
                  subtitle: `${dashboard.users.overview.freeUsers} free users`,
                  icon: Crown,
              },

              {
                  title: "Documents",
                  value: dashboard.documents.overview.totalDocuments,
                  subtitle: `${dashboard.documents.overview.readyDocuments} processed`,
                  icon: FileText,
              },

              {
                  title: "Revenue",
                  value: `₹${dashboard.revenue.overview.totalRevenue.toLocaleString()}`,
                  subtitle: `${dashboard.revenue.overview.activeSubscriptions} active subscriptions`,
                  icon: IndianRupee,
              },

              {
                  title: "AI Requests",
                  value: dashboard.ai.overview.totalRequests,
                  subtitle: `${dashboard.ai.overview.successfulRequests} successful`,
                  icon: Bot,
              },

            //   {
            //       title: "Success Rate",
            //       value: `${dashboard.ai.overview.successRate}%`,
            //       subtitle: `${dashboard.ai.overview.failedRequests} failed requests`,
            //       icon: ShieldCheck,
            //   },
          ]
        : [];

    return (
        <section className="space-y-6">

            <div>

                <h2
                    className="
                        text-2xl
                        font-bold
                        text-gray-900
                    "
                >
                    Overview
                </h2>

                <p
                    className="
                        mt-1
                        text-sm
                        text-gray-500
                    "
                >
                    Quick summary of users, documents,
                    revenue and AI usage.
                </p>

            </div>

            <AnalyticsGrid
                cards={cards}
                loading={loading}
            />

        </section>
    );

};

export default OverviewSection;