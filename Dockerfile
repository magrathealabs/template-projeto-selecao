FROM python:3.7

ENV PYTHONUNBUFFERED 1

# create root directory for our project in the container
RUN mkdir /quem_foi_para_o_mar_service

# Set the working directory to /quem_foi_para_o_mar_service
WORKDIR /quem_foi_para_o_mar_service

# Copy the current directory contents into the container at /quem_foi_para_o_mar_service
ADD . /quem_foi_para_o_mar_service

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt
