import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '../../../hooks/useSubscription';
import { Crown, Sparkles } from 'lucide-react';

const SubscriptionStatusCard: React.FC = () => {
  const navigate = useNavigate();

  const {
    activeSubscription,
    creditStatus,
    loading
  } = useSubscription();

  if (loading) {
    return (
      <div className="mx-3 mb-3 rounded-2xl border border-slate-200 bg-white p-4 animate-pulse">
        <div className="mb-4 h-4 w-24 rounded bg-slate-200" />
        <div className="mb-4 h-6 w-20 rounded bg-slate-200" />
        <div className="h-2 w-full rounded bg-slate-200" />
      </div>
    );
  }

  const currentCredits =
    creditStatus?.creditsRemaining ?? 0;

  const totalCredits =
    creditStatus?.creditsTotal ?? 20;

  const percentage =
    totalCredits > 0
      ? (currentCredits / totalCredits) * 100
      : 0;

  const isPro =
    activeSubscription?.status === 'ACTIVE';

  return (
    <div className="mx-3 mb-3 overflow-hidden rounded-2xl border border-red-100 bg-gradient-to-br from-rose-50 to-red-50 p-4 shadow-sm max-[700px]:p-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            AI Credits
          </h3>

          <p className="mt-2 text-2xl font-bold text-slate-900 max-[700px]:mt-1 max-[700px]:text-xl">
            {currentCredits}/{totalCredits}
          </p>
        </div>

        <div className="rounded-xl bg-white p-2 shadow-sm">
          {isPro ? (
            <Crown
              size={20}
              className="text-yellow-500"
            />
          ) : (
            <Sparkles
              size={20}
              className="text-red-500"
            />
          )}
        </div>
      </div>

      <div className="mt-4 max-[700px]:mt-3">
        <div className="h-2 w-full overflow-hidden rounded-full bg-red-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-red-500 to-rose-600 transition-all duration-300"
            style={{
              width: `${percentage}%`
            }}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between max-[700px]:mt-3">
        <span className="text-xs font-medium text-slate-600">
          {isPro
            ? 'Pro Plan'
            : 'Free Plan'}
        </span>

        <button
          onClick={() =>
            navigate('/subscription/plans')
          }
          className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-red-500 to-rose-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:scale-[1.02]"
        >
          <Crown size={14} />

          {isPro
            ? 'Manage'
            : 'Upgrade'}
        </button>
      </div>
    </div>
  );
};

export default SubscriptionStatusCard;