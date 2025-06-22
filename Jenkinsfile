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
        
        stage("Deploy to Render"){
            steps{
                echo "Deploying to render..."
                withCredentials([string(credentialsId:'render-deploy-hook', variable:'DEPLOY_HOOK')]){
                    sh "curl -X POST $DEPLOY_HOOK"
                }
            }
        }
    }
}