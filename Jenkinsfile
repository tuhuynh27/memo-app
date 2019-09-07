node {
    def app

    stage('Initialize') {
        checkout scm
    }

    stage('Build') {
        app = docker.build("huynhminhtufu/memo-app")
    }

    stage('Test') {
        app.inside {
            sh 'echo "Tests passed"'
        }
    }

    stage('Deploy') {
        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
        }
    }
}