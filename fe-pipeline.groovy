node {
	def dockerTag = (Branch.equals("master")) ? "latest" : Branch

	stage 'Checkout'
	git url: 'https://github.com/miguelgonz/tr-ci-cd-fe.git' , branch : Branch

	stage 'Build'
	sh "cd app; npm install; npm test;"

	stage 'Create Artifact'

	sh "docker build -t unicorn-frontend ."

	stage 'Push Artifact'
	sh "docker tag unicorn-frontend rselvanathan/unicorn-frontend:&{dockerTag}"
	sh "docker push rselvanathan/unicorn-frontend"

	// Clean
	sh "docker rmi unicorn-frontend"
	sh "docker rmi rselvanathan/unicorn-frontend:&{dockerTag}"
}

stage 'Trigger Image_Coordinator'
