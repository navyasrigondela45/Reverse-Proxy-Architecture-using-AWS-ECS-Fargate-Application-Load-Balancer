# Java Tomcat Docker Deployment

This folder contains Dockerfile creation and image optimization for Java WAR deployment using Apache Tomcat.

## Files Included

- Dockerfile.v1
- Dockerfile.v2
- Maven project structure
- Java Servlet application
- tomcat-users.xml
- WAR packaging

---

## Dockerfile Versions

### Dockerfile.v1
- Standard Tomcat deployment

### Dockerfile.v2
- Optimized Tomcat deployment

---

## Outputs Included

- Docker image build output
  <img width="1215" height="117" alt="image" src="https://github.com/user-attachments/assets/ea50ebd5-8153-4848-9a62-6f38d98f25ec" />

- Running container output
  <img width="1600" height="87" alt="image" src="https://github.com/user-attachments/assets/729dedbf-d48a-48b5-b19f-a1e6626bcd21" />

- Browser output screenshots
  <img width="1600" height="802" alt="image" src="https://github.com/user-attachments/assets/d6f630ba-cc7a-4540-b35e-0ac74565c751" />
  <img width="1600" height="799" alt="image" src="https://github.com/user-attachments/assets/0b7e4865-5ca4-40ee-8c98-278ff7b3bb1f" />

---

## Commands

```bash
mvn clean package

docker build -f Dockerfile.v1 -t tomcat:v1 .
docker build -f Dockerfile.v2 -t tomcat:v2 .

docker run -itd --name java-cont1 -p 1111:8080 tomcat:v1
docker run -itd --name java-cont1 -p 1112:8080 tomcat:v2
