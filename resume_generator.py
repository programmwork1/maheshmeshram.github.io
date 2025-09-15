import json
from datetime import datetime
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib import colors

# File paths
resume_path = "Mahesh_Meshram_Resume.pdf"
skills_file = "skills.json"

# Load skills
with open(skills_file, "r") as f:
    skills_data = json.load(f)["skills"]

# Create PDF
doc = SimpleDocTemplate(resume_path, pagesize=A4, rightMargin=40, leftMargin=40, topMargin=40, bottomMargin=40)

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='CustomHeading1', fontSize=16, leading=20, spaceAfter=10, textColor=colors.HexColor("#004080"), alignment=1))
styles.add(ParagraphStyle(name='CustomHeading2', fontSize=12, leading=14, spaceAfter=6, textColor=colors.HexColor("#004080"), alignment=0))
styles.add(ParagraphStyle(name='CustomNormal', fontSize=10, leading=14))

content = []

# Header
content.append(Paragraph("Mahesh Meshram", styles['CustomHeading1']))
content.append(Paragraph("Air Catering Officer", styles['CustomNormal']))
content.append(Paragraph("Email: meshramm892@gmail.com | Phone: +91 96658 00741 / +91 91068 03127", styles['CustomNormal']))
content.append(Paragraph("LinkedIn: linkedin.com/in/mahesh-meshram-a53941177 | GitHub: github.com/programmwork1", styles['CustomNormal']))
content.append(Spacer(1, 0.3*inch))

# Summary
content.append(Paragraph("Professional Summary", styles['CustomHeading2']))
content.append(Paragraph(
    "Air Catering Officer with over 8 years of experience in managing inflight catering services. "
    "Proficient in logistics, food safety, and team management. Adept at coordinating with airline staff "
    "to ensure high-quality service delivery, passenger satisfaction, and compliance with aviation standards.",
    styles['CustomNormal']
))
content.append(Spacer(1, 0.2*inch))

# Experience
content.append(Paragraph("Experience", styles['CustomHeading2']))
content.append(Paragraph("Air Catering Officer (2017 – Present)", styles['CustomNormal']))
content.append(Paragraph(
    "- Oversee inflight catering operations and ensure adherence to airline and safety protocols.<br/>"
    "- Coordinate with catering staff and ground handling teams for timely food delivery.<br/>"
    "- Maintain hygiene standards and compliance with aviation guidelines.<br/>"
    "- Train and supervise staff to improve efficiency and service quality.",
    styles['CustomNormal']
))
content.append(Spacer(1, 0.2*inch))

# Skills
content.append(Paragraph("Skills", styles['CustomHeading2']))
rows = [skills_data[i:i+3] for i in range(0, len(skills_data), 3)]
table = Table(rows, colWidths=[2.5*inch]*3)
table.setStyle(TableStyle([
    ("BACKGROUND", (0,0), (-1,0), colors.HexColor("#004080")),
    ("TEXTCOLOR", (0,0), (-1,0), colors.white),
    ("ALIGN", (0,0), (-1,-1), "CENTER"),
    ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
    ("BOX", (0,0), (-1,-1), 1, colors.black),
    ("GRID", (0,0), (-1,-1), 0.5, colors.grey),
]))
content.append(table)
content.append(Spacer(1, 0.3*inch))

# Footer with last updated date
last_updated = datetime.now().strftime("%d %B %Y")
content.append(Paragraph(f"Last updated: {last_updated}", styles['CustomNormal']))
content.append(Paragraph("© 2025 Mahesh Meshram | Resume", styles['CustomNormal']))

# Build PDF
doc.build(content)
print(f"Resume generated successfully: {resume_path}")