using Bogus;
using Moq;
using NUnit.Framework;
using RepoTag.Application.Services;
using RepoTag.Domain;
using RepoTag.Domain.Users;
using System;

namespace RepoTag.Test.Application
{
    public class UserAppServiceTests
    {
        private Mock<IUnitOfWork> mockUnitOfWork;
        private Mock<IUserService> mockUserService;

        private User user;

        [SetUp]
        public void SetUp()
        {
            this.mockUnitOfWork = new Mock<IUnitOfWork>();
            this.mockUserService = new Mock<IUserService>();

            user = new Faker<User>("pt_BR")
               .CustomInstantiator(f => new User(f.Lorem.Sentence(3), f.Internet.Email(), f.Internet.Password(), "eusougz"))
               .Generate();
        }

        private UserAppService CreateService()
        {
            return new UserAppService(
                this.mockUnitOfWork.Object,
                this.mockUserService.Object);
        }

        [Test]
        public void Create_ShouldFailWithPropsNull()
        {
            var service = CreateService();

            Assert.Throws<ArgumentException>(
              delegate { service.Create(null, null, null, null); });
        }

        [Test]
        public void Create_ShouldCreateSuccessWithCorrectParameters()
        {
            var service = CreateService();
            mockUserService.Setup(e => e.Create(user.Name, user.Email, user.Password, user.HostingPlatformUsername)).Returns(user);

            var result = service.Create(user.Name, user.Email, user.Password, user.HostingPlatformUsername);

            Assert.NotNull(result);
            Assert.AreEqual(user.Name, result.Name);
            Assert.AreEqual(user.Email, result.Email);
            Assert.AreEqual(user.Password, result.Password);
            Assert.AreEqual(user.HostingPlatformUsername, result.HostingPlatformUsername);
        }

        [Test]
        public void Get_ShouldFailWithPropsNull()
        {
            var service = CreateService();

            Assert.Throws<ArgumentException>(
              delegate { service.Get(null, null); });
        }

        [Test]
        public void Get_ShouldReturnCorrectUser()
        {
            var service = CreateService();
            mockUnitOfWork.Setup(e => e.Users.GetByEmailAndPassword(user.Email, user.Password)).Returns(user);

            var result = service.Get(
                user.Email,
                user.Password);

            Assert.AreEqual(user, result);
        }
    }
}
