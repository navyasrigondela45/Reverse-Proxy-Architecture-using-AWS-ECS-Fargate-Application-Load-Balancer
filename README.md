# Reverse Proxy Architecture using AWS ECS, Fargate & Application Load Balancer

## Project Summary

This project demonstrates a complete reverse proxy architecture deployed on AWS using ECS Fargate, Application Load Balancer (ALB), Docker containers, and path-based routing.

Two containerized applications were deployed:

* Food Service (Apache HTTPD)
* Quiz Service (Tomcat Java Application)

Both applications were containerized using Docker, pushed to container registry, and deployed as ECS services with multiple replicas. An AWS Application Load Balancer was configured to act as a reverse proxy and route traffic dynamically to the respective services using path-based routing.

The project also involved troubleshooting ECS networking, target groups, awsvpc mode, IP-based target registration, ALB listener rules, and container routing behavior.

---

# Technologies Used

* Docker
* AWS ECS
* AWS Fargate
* AWS Application Load Balancer (ALB)
* Target Groups
* ECS Services
* Apache HTTPD
* Tomcat
* Docker Hub
* Path-Based Routing
* Reverse Proxy Architecture
* awsvpc Networking Mode

---

# Project Workflow

## Step 1: Created Docker Images

* Built HTTPD image for Food Service
* Built Tomcat image for Quiz Service
* Configured application paths for ALB routing

## Step 2: Pushed Images to Docker Hub

* Tagged Docker images
* Pushed images to Docker registry

## Step 3: Created ECS Cluster

* Created ECS cluster using Fargate launch type
* Configured networking and security groups

## Step 4: Created ECS Task Definitions

* Configured CPU and memory
* Added container images and ports
* Used awsvpc network mode

## Step 5: Created ECS Services

* Created Food Service
* Created Quiz Service
* Configured desired replica count

## Step 6: Created Target Groups

* Created IP-based target groups
* Configured health checks
* Attached ECS services

## Step 7: Configured Application Load Balancer

* Created ALB listener on port 80
* Configured path-based routing:

  * /food → Food Service
  * /quiz → Quiz Service

## Step 8: Verified Reverse Proxy Routing

* Accessed both services using single ALB DNS
* Verified healthy targets and successful routing

---

# Features Implemented

* Reverse Proxy Architecture
* Path-Based Routing
* ECS Fargate Deployment
* Docker Containerization
* Load Balancing
* High Availability using Replicas
* Target Groups & Health Checks
* DNS-Based Access
* ECS Service Management
* Cloud-Native Networking

---

# Access URLs

* http://ALB-DNS/food
* http://ALB-DNS/quiz

---

# Learning Outcomes

Through this project, I learned:

* ECS and Fargate deployment workflow
* Application Load Balancer configuration
* Reverse proxy implementation in AWS
* Target groups and health checks
* ECS networking concepts
* Path-based traffic routing
* Docker image management
* Troubleshooting cloud deployments

---

# Architecture

Internet → Application Load Balancer → ECS Services → Containerized Applications

* /food → HTTPD Container
* /quiz → Tomcat Container

* **awsvpc Networking Mode** → In ECS/Fargate, every container/task gets its own private IP address and network interface, just like a separate server. That’s why your ALB target groups had to use **IP type** instead of instance type.

* **ECS Fargate Deployment** → You deployed containers on AWS without managing EC2 servers manually. AWS automatically handled the infrastructure, scaling, networking, and runtime while you focused only on containers and services.

* **Cloud-Native Networking** → Your applications communicated using AWS-managed networking components like VPC, subnets, security groups, ALB, target groups, and ECS services instead of traditional on-premise server networking. This is modern cloud-based application architecture.

