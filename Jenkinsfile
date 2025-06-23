pipeline{
    agent any
    
    tools {
        nodejs 'NodeJS'
    }
    
    environment{
        RENDER_URL = 'https://gallery-static.onrender.com'
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
                sh "node build.js"
              
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
            echo "PipeLine failed"
        }
        
        success{
            echo "Pipeline completed successfully"
            echo "Deployment to Render was successful"
            
            slackSend(
                channel: '#all-sophieip1',
                color: 'good',
                tokenCredentialId: 'Sophie_IP1',
                message: """
                Deployment Successful
                
                Build details:
                Build ID: #${env.BUILD_NUMBER}
                Branch: master
                
                Live Site: ${env.RENDER_URL}
                
                """
                
                )
        }
        
        always{
            echo 'Pipeline execution completed'
        }
    }
}