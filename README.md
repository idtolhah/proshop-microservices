# proshop-microservices

Create volume directory for database
  > mkdir db-volume

Create jwt secret
  > kubectl create secret generic jwt-secret --from-literal='JWT_KEY=......'

Create stripe key secret
  > kubectl create secret generic stripe-secret --from-literal='STRIPE_KEY=......'

Install Ingress Nginx
  > kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.40.2/deploy/static/provider/cloud/deploy.yaml

Run microservices with
  > skaffold dev -f skaffold.yml

Run frontend:
  > npm start
