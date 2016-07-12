FROM jenkinsci/jenkins
MAINTAINER team-unicorn
USER root
RUN apt-get update
RUN apt-get -y install docker.io
RUN apt-get -y install awscli  
RUN apt-get install curl
RUN apt-get -y install npm
RUN curl -o /usr/local/bin/ecs-cli https://s3.amazonaws.com/amazon-ecs-cli/ecs-cli-linux-amd64-latest
RUN chmod +x /usr/local/bin/ecs-cli