import streamlit as st
from PIL import Image
import base64
from io import BytesIO

from PIL import Image
import streamlit as st
import base64
from io import BytesIO

# --- PAGE CONFIGURATION ---
st.set_page_config(page_title="Tanisha Sinha | Portfolio", page_icon="📊", layout="wide")

# --- Helper to Convert Image to Base64 ---
def image_to_base64(img):
    buffer = BytesIO()
    img.save(buffer, format="JPEG")
    img_str = base64.b64encode(buffer.getvalue()).decode()
    return img_str

# --- Load Image and Convert to Base64 ---
image = Image.open("IMG-20230501-WA0016.jpg")
encoded_image = image_to_base64(image)

# --- Profile Header with Image Left of Name ---
st.markdown(f"""
    <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
        <img src="data:image/jpeg;base64,{encoded_image}" style="width: 200px; height: 200px; border-radius: 50%; object-fit: cover; box-shadow: 0 4px 8px rgba(0,0,0,0.2);"/>
        <div>
            <h1 style="margin-bottom: 5px;">Tanisha Sinha</h1>
            <p style="font-size: 18px; margin-top: 0;">UG @CSVTU'25 | Data Scientist | AI & ML | Business Intelligence</p>
        </div>
    </div>
""", unsafe_allow_html=True)



# --- SOCIAL LINKS ---
st.markdown("""
[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=flat&logo=linkedin)](www.linkedin.com/in/tanishasinhaa)
[![GitHub](https://img.shields.io/badge/GitHub-black?style=flat&logo=github)](https://github.com/tanisshaaa)
[![Email](https://img.shields.io/badge/Email-red?style=flat&logo=gmail)](mailto:tanisha02sinha@gmail.com)
""")

# --- ABOUT ME ---
st.header("📌 About Me")
st.write("I'm a final-year undergraduate student passionate about transforming theoretical knowledge into real-world solutions. I enjoy problem-solving, logical thinking, and exploring new tools and technologies. Always curious to learn how things work, I've worked on both small and large-scale projects—feel free to check them out!")
# --- RESUME DOWNLOAD (Optional) ---
# with open("resume.pdf", "rb") as file:
#     btn = st.download_button(
#         label="📄 Download Resume",
#         data=file,
#         file_name="Tanisha_Sinha_Resume.pdf",
#         mime="application/pdf"
#     )

# --- SKILLS ---
st.header("🛠 Skills & Tools")
# skills = ["C++","Python", "SQL", "Streamlit", "Power BI", "Apache Kafka", "Git", "Machine Learning", "Excel"]
# st.write(", ".join(skills))
st.markdown("""
    - Power BI  
    - Apache Kafka  
    - Streamlit  
    - Hugging Face  
    - Docker  
    - Scikit-learn  
    - TensorFlow / PyTorch
    """)

# Section 4: Cloud Services
with st.expander("☁️ Cloud Services"):
    st.markdown("""
    - AWS (Amazon Web Services)  
    - Microsoft Azure (if applicable)
    """)

# Section 5: Databases
with st.expander("🗃️ Databases"):
    st.markdown("""
    - MySQL  
    - PostgreSQL  
    - MongoDB
    """)

# Section 6: Soft Skills
with st.expander("🤝 Soft Skills"):
    st.markdown("""
    - Communication  
    - Problem-Solving  
    - Leadership  
    - Team Collaboration  
    - Adaptability
    """)

# --- Mini PROJECTS ---
st.header("Quick Builds")
projects = {
    "Pizza-Sales-Dashboard": "An interactive dashboard that visualizes pizza sales performance using key metrics like revenue, top-selling items, and peak order times.",
    "Dairy-Sales-Analysis": "This repository contains a Power BI dashboard for analyzing dairy farm performance, product sales, and distribution patterns.",
    "Maven-Market-Analysis": "Performed data-driven analysis to uncover sales trends, customer behavior, and market insights for strategic decision-making.",
    "Spotify-Dashboard": "Visualized Spotify streaming data to analyze top tracks, artists, genres, and listening trends over time.",
    #"Fraud Detection in Transactions": "Anomaly detection using Isolation Forest & Random Forest."
}
for project, desc in projects.items():
    with st.expander(f"🔹 {project}"):
        st.write(desc)
        st.markdown(f"[GitHub Repo](https://github.com/tanisshaaa/{project.replace(' ', '_').lower()})")
        


#Major projects        
st.header("Advance Builds")
projects = {
    "Performance-Analysis-of-Apache-Spark-Job-Schedulers-for-Big-Data-Processing": "Conducted a comparative analysis of Apache Spark's job schedulers including FIFO, Fair, and Capacity. Evaluated performance based on execution time, resource utilization, and workload distribution under varying conditions. The study provides insights to optimize scheduler selection for efficient big data processing.",
    # "Stock Price Forecasting": "Time series forecasting with ARIMA & Prophet.",
    # "E-Commerce Recommendation System": "Collaborative filtering & deep learning-based recommendations.",
    # "Healthcare Readmission Prediction": "ML model to predict patient readmission probability.",
    # "Fraud Detection in Transactions": "Anomaly detection using Isolation Forest & Random Forest."
}
for project, desc in projects.items():
    with st.expander(f"🔹 {project}"):
        st.write(desc)
        st.markdown(f"[GitHub Repo](https://github.com/tanisshaaa/{project.replace(' ', '_').lower()})")
        
#--- Work Experience and Internships ---
st.header("🔧 Work Experience & Internships")

experience = [
    {
        "role": "Research Intern – IIIT Naya Raipur",
        "duration": "March 2024 – June 2024",
        "details": "Worked on performance analysis of Apache Spark job schedulers for big data processing. Conducted experiments and reported benchmarking results."
    },
    # {
    #     "role": "Event Coordinator – TPO Cell, College",
    #     "duration": "Jan 2024 – Mar 2024",
    #     "details": "Managed event logistics, coordinated with company representatives, and streamlined placement activities with the training and placement office."
    # }
]

for item in experience:
    st.subheader(f"💼 {item['role']}")
    st.write(f"📅 {item['duration']}")
    st.write(item['details'])
    st.markdown("---")

# --- Certifications Section ---
st.header("📜 Certifications")

certifications = [
    {
        "title": "Data Visualization",
        "issuer": "Kaggle",
        "year": "2025",
        "link": "https://www.kaggle.com/learn/certification/tanishasinha/data-visualization"
    },
    {
        "title": "SQL(Basic)",
        "issuer": "HackerRank",
        "year": "2024",
        "link": "https://www.hackerrank.com/certificates/0222347779da"
    }
]

for cert in certifications:
    st.subheader(f"{cert['title']}")
    st.write(f"**Issued by:** {cert['issuer']}  \n**Year:** {cert['year']}")
    st.markdown(f"[🔗 View Certificate]({cert['link']})")
    st.markdown("---")


# --- Achievements / Awards Section ---
st.header("🏆 Achievements")

awards = [
    "[Presented a research paper on Apache Spark Scheduler at IEEE TENSYMP 2024](https://ieeexplore.ieee.org/abstract/document/10752267)",
    # "Winner of College-Level Hackathon for developing a Smart Traffic Monitoring System.",
    # "Anchored the Ganesh Chaturthi celebration event as part of the student cultural committee.",
    # "Secured 1st place in Inter-College Data Science Quiz, 2023."
]

for award in awards:
    st.markdown(f"- {award}")



# --- CONTACT ---
st.header("📬 Contact Me")
contact_form = st.form("contact_form")
contact_form.text_input("Your Name")
contact_form.text_input("Your Email")
contact_form.text_area("Your Message")
submit_button = contact_form.form_submit_button("Send Message")
if submit_button:
    st.success("✅ Message Sent Successfully!")
