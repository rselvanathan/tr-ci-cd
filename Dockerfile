FROM jenkinsci/jenkins
MAINTAINER team-unicorn
USER root
RUN apt-get update /
&& apt-get -y install docker.io /
&& apt-get -y install awscli /
&& apt-get install curl /
&& apt-get -y install npm /
&& apt-get -y install node /
&& apt-get -y install nodejs-legacy /
&& curl -o /usr/local/bin/ecs-cli https://s3.amazonaws.com/amazon-ecs-cli/ecs-cli-linux-amd64-latest /
&& chmod +x /usr/local/bin/ecs-cli /
&& ln -s `which nodejs` /usr/bin/node