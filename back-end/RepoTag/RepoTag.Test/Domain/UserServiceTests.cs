using Bogus;
using Moq;
using NUnit.Framework;
using RepoTag.Domain;
using RepoTag.Domain.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace RepoTag.Test.Domain
{
    public class UserServiceTests
    {
        private Mock<IUnitOfWork> mockUnitOfWork;

        private User user;

        [SetUp]
        public void Setup()
        {
            mockUnitOfWork = new Mock<IUnitOfWork>();

            user = new Faker<User>("pt_BR")
                .CustomInstantiator(f => new User(f.Lorem.Sentence(3), f.Internet.Email(), f.Internet.Password(), f.Internet.UserName()))
                .Generate();
        }

        private UserService CreateService()
        {
            return new UserService(mockUnitOfWork.Object);
        }

        [Test]
        public void CreateUser_ShouldUseRepository()
        {
            var service = CreateService();
            mockUnitOfWork.Setup(e => e.Users.Add(user)).Returns(user);

            service.Create(user.Name, user.Email, user.Password, user.HostingPlatformUsername);

            mockUnitOfWork.Verify(e => e.Users.Add(It.IsAny<User>()), Times.Once);
        }
    }
}
