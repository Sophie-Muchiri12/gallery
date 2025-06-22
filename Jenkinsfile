pipeline{
    agent any
    
    tools {
        nodejs 'NodeJS'
    }
    
    stages{
        stage('Check code'){
            steps{
                echo "Checking code from gallery repository"
                git branch: 'master', url: 'https://github.com/Sophie-Muchiri12/gallery.git'
            }
        }
        
        stage("Install Dependencies"){
            steps{
                echo "Installing dependencies"
                sh "npm install"
            }
        }
        
        stage("Building code"){
            steps{
                echo "Building code"
              
            }
        }
        
        stage("Run Tests"){
            steps{
                echo "Running tests"
                sh "npm test"
            }
        }
        
        stage("Deploy to Render"){
            steps{
                echo "Deploying to render..."
                withCredentials([string(credentialsId:'render-deploy-hook', variable:'DEPLOY_HOOK')]){
                    sh "curl -X POST $DEPLOY_HOOK"
                }
            }
        }
    }
    
    post{
        failure{
            emailext(
                subject: "Pipeline Tests Failed on Gallery Project - Build #${env.BUILD_NUMBER}",
                body: """
                <html>
                <body>
                    <h2>Pipeline Failed Tests</h2>
                    
                    <p>The Jenkins pipeline for Tests in the Gallery Repo Project failed</p>
                    
                    <h3>Build Details:</h3>
                    
                    <ul>
                        <li>Job Name: ${env.JOB_NAME}</li>
                        <li>Build Number: ${env.BUILD_NUMBER}</li>
                        <li>Build URL: <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></li>
                    </ul>
                    
                    <p>Please check the <a href="${env.BUILD_URL}console">console output</a> for more details</p>
                    
                </body>
                </html>
                """,
                to: "muthonisophie12@gmail.com",
                mimeType: 'text/html'
            )
        }
        
        success{
            echo "Pipeline completed successfully"
            echo "Deployment to Render was successful"
        }
        
        always{
            echo 'Pipeline execution completed'
        }
    }
}