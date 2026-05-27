# HTTPD Docker Deployment

This folder contains Dockerfile creation and image optimization for Apache HTTPD deployment.

## Files Included

- Dockerfile.v1
- Dockerfile.v2
- index.html

---

## Dockerfile Versions

### Dockerfile.v1
- Standard HTTPD deployment

### Dockerfile.v2
- Optimized lightweight deployment
- Reduced image size

---

## Outputs Included

- Docker image build output
  <img width="1112" height="128" alt="image" src="https://github.com/user-attachments/assets/481699ef-b88d-45d9-a91b-f3a3da45c0dd" />

- Running container output
  <img width="1600" height="94" alt="image" src="https://github.com/user-attachments/assets/319f79c8-7a58-432e-b3eb-cf38742c55ca" />

- Browser output screenshots
  <img width="1600" height="807" alt="image" src="https://github.com/user-attachments/assets/5dd3bc4e-0102-463a-9abd-741c815d3194" />

---

## Commands

```bash
docker build -f Dockerfile.v1 -t httpd:v1 .
docker build -f Dockerfile.v2 -t httpd:v2 .

docker run -d --name httpd-cont1 -p 3333:80 httpd:v1
docker run -d --name httpd-cont2 -p 4444:80 httpd:v2
