import React from "react";

const HowToApply = () => {
    const steps = [
        {
            id: "01",
            title: "Create an Account",
            description:
                "Register to explore a diverse range of scholarships tailored to your academic goals.",
            icon: "🎓",
        },
        {
            id: "02",
            title: "Online Application",
            description:
                "Submit your application online and track your progress easily.",
            icon: "📝",
        },
        {
            id: "03",
            title: "Programs & Requirements",
            description:
                "Check eligibility criteria and program details before applying.",
            icon: "📖",
        },
    ];

    return (
        <div className="py-12">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-4xl text-primary font-bold mb-4">How to Apply to DreamScholar</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Follow these simple steps to apply for scholarships that match your
                    academic journey.
                </p>

                {/* Steps Grid */}
                <div className="mt-10 grid md:grid-cols-3 gap-6">
                    {steps.map((step) => (
                        <div
                            key={step.id}
                            className="bg-primary text-white p-6 rounded-lg shadow-md text-left"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-4xl">{step.icon}</span>
                                <span className="text-3xl font-bold text-secondary">
                                    {step.id}
                                </span>
                            </div>
                            <h3 className="text-2xl font-semibold mt-4">{step.title}</h3>
                            <p className="mt-2 text-white/90">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HowToApply;
