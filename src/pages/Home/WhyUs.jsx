import React from 'react';

const WhyUs = () => {
    return (
        <section className="py-16 px-4 max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-700">Why Dream Scholar?</h2>
            <p className="text-gray-600 mb-12">
                We make finding and applying for scholarships simple, efficient, and successful.
            </p>

            <div className="grid gap-6 md:grid-cols-3">

                <div className="bg-white border rounded-2xl shadow-sm text-card-foreground shadow-2xs text-center p-8 border-slate-200 hover:shadow-lg transition-shadow">
                    <div className="bg-blue-100 text-blue-600 p-4 rounded-full w-fit mx-auto mb-4">
                        🎓
                    </div>
                    <h3 className="text-xl font-semibold mb-4">Thousands of Scholarships</h3>
                    <p className="text-slate-600">
                        Access a comprehensive database of <br /> scholarships from universities worldwide, <br /> updated daily.
                    </p>
                </div>

                <div className="bg-white border rounded-2xl shadow-sm text-card-foreground shadow-2xs text-center p-8 border-slate-200 hover:shadow-lg transition-shadow">
                    <div className="bg-green-100 text-green-600 p-4 rounded-full w-fit mx-auto mb-4">
                        📄
                    </div>
                    <h3 className="text-xl font-semibold mb-4">Easy Application</h3>
                    <p className="text-slate-600">
                        Streamlined application process with pre- <br /> filled forms and document management.
                    </p>
                </div>

                <div className="bg-white border rounded-2xl shadow-sm text-card-foreground shadow-2xs text-center p-8 border-slate-200 hover:shadow-lg transition-shadow">
                    <div className="bg-purple-100 text-purple-600 p-4 rounded-full w-fit mx-auto mb-4">
                        📊
                    </div>
                    <h3 className="text-xl font-semibold mb-4">Track Progress</h3>
                    <p className="text-slate-600">
                        Monitor your application status and get <br /> real-time updates on your scholarship <br /> journey.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WhyUs;