import React from "react";

const HowToApply = () => {
    const steps = [
        {
            number: "1",
            title: "Search & Discover",
            description:
                "Browse through thousands of scholarships using our advanced search and filtering options.",
            color: "bg-blue-200 text-blue-600",
        },
        {
            number: "2",
            title: "Apply Easily",
            description:
                "Submit your applications with our streamlined process and secure document upload.",
            color: "bg-green-200 text-green-600",
        },
        {
            number: "3",
            title: "Track & Succeed",
            description:
                "Monitor your application status and receive updates until you achieve your scholarship goals.",
            color: "bg-purple-200 text-purple-600",
        },
    ];

    return (
        <section className="py-16 px-4 max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-700">
                How to Apply to Dream Scholar
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-12">
                Follow these simple steps to apply for scholarships that match your academic journey.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {steps.map((step, idx) => (
                    <div key={idx} className="space-y-4">
                        <div
                            className={`w-20 h-20 mx-auto flex items-center justify-center rounded-full text-2xl font-bold ${step?.color}`}
                        >
                            {step?.number}
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-4">{step?.title}</h3>
                        <p className="text-slate-600">{step?.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowToApply;
