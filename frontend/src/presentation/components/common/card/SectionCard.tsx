import React from 'react';

type Props = {
    title?: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
    headerAction?: React.ReactNode
}

const SectionCard: React.FC<Props> = ({
    title,
    description,
    children,
    className="",
    headerAction,
}) => {
    return (
        <section
            className={`rounded-3xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}
        >
            {(title || description || headerAction) && (
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        {title && (
                            <h2 className="text-lg font-semibold text-slate-900">
                                {title}
                            </h2>
                        )}

                        {description && (
                            <p className="mt-1 text-sm text-slate-500">
                                {description}
                            </p>
                        )}
                    </div>

                    {headerAction && (
                        <div>
                            {headerAction}
                        </div>
                    )}
                </div>
            )
            }
            {children}
        </section>
    )
}

export default SectionCard;
