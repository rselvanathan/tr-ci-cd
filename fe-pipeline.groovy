node {
	// Mark the code checkout 'stage'....
	stage 'Checkout'

	// Get some code from a GitHub repository
	git url: 'https://github.com/miguelgonz/tr-ci-cd-fe.git'

	// Mark the code build 'stage'....
	stage 'Build'
	// Run the npm build
	sh "cd app; npm install; npm test;"

	stage 'Create Artifact'

	sh "docker build -t unicorn-frontend ."

	stage 'Push Artifact'
	sh "docker tag unicorn-frontend rselvanathan/unicorn-frontend:latest"
	sh "docker push rselvanathan/unicorn-frontend"

	// Clean
	sh "docker rmi unicorn-frontend"
	sh "docker rmi rselvanathan/unicorn-frontend:latest"

	stage 'Trigger Deploy'
	build 'Deploy-to-AWS'
}
