node {
	def mvnHome = tool 'M3'
	def dockerTag = (Branch.equals("master")) ? "latest" : Branch
	
	stage 'Checkout'
	git url: 'https://github.com/miguelgonz/tr-ci-cd-be.git', branch : Branch

	// Mark the code build 'stage'....
	stage 'Build'
	sh "${mvnHome}/bin/mvn -Dmaven.test.failure.ignore clean install"
	step([$class: 'JUnitResultArchiver', testResults: '**/target/surefire-reports/TEST-*.xml'])

	stage 'Create Artifact'

	sh "docker build -t unicorn-backend ."

	stage 'Push Artifact'
	sh "docker tag unicorn-backend rselvanathan/unicorn-backend:${dockerTag}"
	sh "docker push rselvanathan/unicorn-backend:${dockerTag}"

	// Clean
	sh "docker rmi unicorn-backend"
	sh "docker rmi rselvanathan/unicorn-backend:${dockerTag}"
}

stage 'Trigger Image_Coordinator'