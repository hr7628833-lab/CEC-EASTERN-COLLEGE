import React from "react";
import Footer from "../components/Footer.jsx";

function HistoryPage() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      {/* Page Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-24 px-6 text-center">
        <h1 className="text-4xl font-bold mb-2">Cebu Eastern College</h1>
        <p className="text-lg italic">
          (宿务东方学院 | 宿務東方學院 | Sùwù Dōngfāng Xuéyuàn | Sok-bū Tong-hong Ha̍k-īⁿ)
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        {/* About Section */}
        <section className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-600 inline-block pb-1">About CEC</h2>
          <p className="text-gray-700 leading-relaxed">
            Cebu Eastern College (simplified Chinese: 宿务东方学院; traditional Chinese: 宿務東方學院; pinyin: Sùwù Dōngfāng Xuéyuàn; Pe̍h-ōe-jī: Sok-bū Tong-hong Ha̍k-īⁿ) is a Chinese Filipino school situated at the intersection of Dimasalang and Leon Kilat in Cebu City, Philippines. The campus offers kindergarten, elementary, high school and college classes. Additionally, they operate a separate campus on D. Jakosalem that focuses on elementary-level education. CEC offers Chinese classes as well as English and Filipino subjects.
          </p>
        </section>

        {/* Sports Section */}
        <section className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-600 inline-block pb-1">Sports Achievements</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The school participates in the Cebu Schools Athletic Foundation, Inc. (CESAFI). They have been led by multiple CESAFI stars such as Nikee Montalvo, among many others. They won the Happee Online Sinulog Basketball Cup, defeating Hapee Online with a final score of 195–192, led by their leading wingman Montalvo with 30 points in double overtime.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            In the CESAFI 2010 season, CEC won the championship crown, as the Dragons defeated the SHS-Ateneo De Cebu Magis Eagles, 3–0, in a best-of-five series.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Other notable stars include basketball cagers BJ Zosa, Mark Olayon, and Roy Villarias, who were among the selected players recruited by the UE Red Warriors to play in the UAAP. James Tempra and Raymar Jose were recruited to play for the FEU Tamaraws.
          </p>
        </section>
      </main>

    
    </div>
  );
}

export default HistoryPage;
