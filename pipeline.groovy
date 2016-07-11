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
}
