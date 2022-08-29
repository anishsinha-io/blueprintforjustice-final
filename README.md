# BlueprintForJustice

This website is a resource that is available to help victims of police brutality to get justice for the harm that they faced.

### Team

This website was built, tested, and deployed in its entirety by Anish Sinha, designed by Satveer Singh and Alyssa Guo, and directed by Jacqueline Vo.

### Technologies used

This website was built primarily in TypeScript and Python, with React as a client side UI library and Flask as a server side framework. Nginx was used as a reverse proxy to route traffic properly and Docker was used for containerization during development, so if anyone wants to run this program locally, simply `git clone` this repository and run `docker-compose up`, or `docker-compose down && docker-compose up --build`. Before you do this though, make sure you follow the instructions in the README file within the server directory to set up the server's database and email endpoints properly. If you've done this correctly, the aforementioned docker commands should work as long as you have Docker and docker-compose installed. Kubernetes were _very briefly_ considered for this project, however, that would've just been overkill. Also, you will have to change your environment variables on the server side though, as well as create your own SendInBlue account if you want the email functionality to work. This website is deployed on Amazon Web Services (AWS), specifically using the service Elastic Cloud Compute (EC2). SQLite was used as an embedded database for this project, mainly to serve as an alternative to flat files for storing data. A client-server database wasn't necessary due to the small amount of data and the miniscule operations performed, as well as the fact that SQLite is free whereas every managed Cloud SQL service costs upwards of $10/month.

### License

This software is distributed under the GPL License Version 3. Please see their website (https://www.gnu.org/licenses/gpl-3.0.en.html). The license is relatively permissive, but please do follow the terms if you intend to use this code in any real capacity.

### Issues

If any issues are found or noticed, please email anishsinha0128@gmail.com and I will try to fix the problem and get back to you.
