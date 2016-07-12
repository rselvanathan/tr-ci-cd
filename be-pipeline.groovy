node {
	// Mark the code checkout 'stage'....
	stage 'Checkout'

	// Get some code from a GitHub repository
	git url: 'https://github.com/miguelgonz/tr-ci-cd-be.git'

	// Get the maven tool.
	// ** NOTE: This 'M3' maven tool must be configured
	// **       in the global configuration.           
	def mvnHome = tool 'M3'

	// Mark the code build 'stage'....
	stage 'Build'
	// Run the maven build
	sh "${mvnHome}/bin/mvn -Dmaven.test.failure.ignore clean install"
	step([$class: 'JUnitResultArchiver', testResults: '**/target/surefire-reports/TEST-*.xml'])

	stage 'Create Artifact'

	sh "docker build -t unicorn-backend ."

	stage 'Push Artifact'
	sh "docker tag unicorn-backend rselvanathan/unicorn-backend:latest"
	sh "docker push rselvanathan/unicorn-backend"

	// Clean
	sh "docker rmi unicorn-backend"
	sh "docker rmi rselvanathan/unicorn-backend:latest"

	stage 'Trigger Deploy'
	build 'Deploy-to-AWS'
}