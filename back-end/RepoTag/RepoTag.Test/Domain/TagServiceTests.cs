using Bogus;
using Moq;
using NUnit.Framework;
using RepoTag.Domain;
using RepoTag.Domain.Tags;
using RepoTag.Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RepoTag.Test.Domain
{
    public class TagAppServiceTests
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

        private TagService CreateService()
        {
            return new TagService(mockUnitOfWork.Object);
        }

        [Test]
        public void TryInsertRepos_ShouldNotAddExistingRepo()
        {
            var service = CreateService();
            var hostingPlatformRepositoryIds = new List<int>() { 1, 2 };
            var repos = new List<Repository>() { new Repository(1, user) };
            mockUnitOfWork.Setup(e => e.Tags.GetAllReposByUser(user)).Returns(repos);

            var newRepos = service.TryInsertRepos(hostingPlatformRepositoryIds, user);

            Assert.AreEqual(1, newRepos.Count());
            Assert.AreNotEqual(repos.First().Id, newRepos.First().Id);
        }

        [Test]
        public void CreateTag_ShouldUseRepository()
        {
            var service = CreateService();
            var tag = new Faker<Tag>("pt_BR")
                .CustomInstantiator(f => new Tag(f.Lorem.Sentence(3), Colors.Brown, user))
                .Generate();
            mockUnitOfWork.Setup(e => e.Tags.Add(tag)).Returns(tag);

            service.Create(tag.Name, tag.Color, tag.User);

            mockUnitOfWork.Verify(e => e.Tags.Add(It.IsAny<Tag>()), Times.Once);
        }
    }
}
