using Bogus;
using Moq;
using NUnit.Framework;
using RepoTag.AntiCorruption;
using RepoTag.Application.Interfaces;
using RepoTag.Application.Services;
using RepoTag.Application.ViewModels;
using RepoTag.Domain;
using RepoTag.Domain.Tags;
using RepoTag.Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepoTag.Test.Application
{
    public class TagAppServiceTests
    {
        private Mock<IUnitOfWork> mockUnitOfWork;
        private Mock<ITagService> mockTagService;
        private Mock<IHostingPlatformService> mockHPService;

        private User user;
        private List<Tag> tags;
        private List<TagViewModel> tagsViewModels;

        [SetUp]
        public void Setup()
        {
            mockUnitOfWork = new Mock<IUnitOfWork>();
            mockTagService = new Mock<ITagService>();
            mockHPService = new Mock<IHostingPlatformService>();

            user = new Faker<User>("pt_BR")
               .CustomInstantiator(f => new User(f.Lorem.Sentence(3), f.Internet.Email(), f.Internet.Password(), "eusougz"))
               .Generate();
            tags = new Faker<Tag>("pt_BR")
                .CustomInstantiator(f => new Tag(f.Lorem.Sentence(3), Colors.Brown, user))
                .Generate(2);
            tagsViewModels = new Faker<TagViewModel>("pt_BR")
                .CustomInstantiator(f => new TagViewModel() { Id = Guid.NewGuid(), Name = f.Lorem.Sentence(3), Color = Colors.Green })
                .Generate(5);
        }

        private TagAppService CreateService()
        {
            return new TagAppService(
                this.mockUnitOfWork.Object,
                this.mockHPService.Object,
                this.mockTagService.Object);
        }

        [Test]
        public async Task GetRepoTags_ShouldCallTryInsertRepos()
        {
            var service = CreateService();
            mockUnitOfWork.Setup(e => e.Tags.GetAllReposByUser(user)).Returns(new List<Repository>());
            mockHPService.Setup(e => e.GetStarredRepositories(user.HostingPlatformUsername)).Returns(Task.FromResult(new List<HostingPlatformRepoViewModel>()));
            mockTagService.Setup(e => e.TryInsertRepos(It.IsAny<List<int>>(), user)).Returns(new List<Repository>());

            await service.GetRepoTags(user);

            mockTagService.Verify(e => e.TryInsertRepos(It.IsAny<List<int>>(), user), Times.Once);
        }

        [Test]
        public async Task GetRepoTags__ShouldReturnSameLenghtOfHostingPlatformRepos()
        {
            var service = CreateService();
            var hostingPlatformRepos = new Faker<HostingPlatformRepoViewModel>()
                .CustomInstantiator(f => new HostingPlatformRepoViewModel() { Id = f.Random.Int(0), Description = f.Lorem.Sentence(10), Name = f.Lorem.Sentence(3) })
                .Generate(5);
            var repos = hostingPlatformRepos.Select(hpr => new Repository(hpr.Id, user));
            mockUnitOfWork.Setup(e => e.Tags.GetAllReposByUser(user)).Returns(repos);
            mockHPService.Setup(e => e.GetStarredRepositories(user.HostingPlatformUsername)).Returns(Task.FromResult(hostingPlatformRepos));
            mockTagService.Setup(e => e.TryInsertRepos(It.IsAny<List<int>>(), user)).Returns(new List<Repository>());

            var repoTags = await service.GetRepoTags(user);

            Assert.AreEqual(repoTags.Count(), hostingPlatformRepos.Count());
        }

        [Test]
        public async Task GetRepoTags_ShouldReturnWithTagsOfRepo()
        {
            var service = CreateService();
            var hostingPlatformRepos = new Faker<HostingPlatformRepoViewModel>()
                .CustomInstantiator(f => new HostingPlatformRepoViewModel() { Id = f.Random.Int(0), Description = f.Lorem.Sentence(10), Name = f.Lorem.Sentence(3) })
                .Generate(5);
            var repos = hostingPlatformRepos.Select(hpr => new Repository(hpr.Id, user));
            mockUnitOfWork.Setup(e => e.Tags.GetAllReposByUser(user)).Returns(repos);
            mockUnitOfWork.Setup(e => e.Tags.GetAllByRepoAndUser(It.IsAny<Guid>(), user)).Returns(tags);
            mockHPService.Setup(e => e.GetStarredRepositories(user.HostingPlatformUsername)).Returns(Task.FromResult(hostingPlatformRepos));
            mockTagService.Setup(e => e.TryInsertRepos(It.IsAny<List<int>>(), user)).Returns(new List<Repository>());

            var repoTags = await service.GetRepoTags(user);

            Assert.IsTrue(repoTags.All(rt => rt.Tags.Count() == tags.Count()));
        }

        [Test]
        public void InsertOrRemoveTags_ShouldCallAddTagInTheSameAmountOfTagsAdded()
        {
            var service = CreateService();
            var repoId = Guid.NewGuid();
            mockUnitOfWork.Setup(e => e.Tags.GetAllByRepoAndUser(repoId, user)).Returns(tags);

            service.InsertOrRemoveTags(tagsViewModels, repoId, user);

            mockUnitOfWork.Verify(e => e.Tags.AddRepoTag(It.IsAny<Guid>(), It.IsAny<Guid>(), It.IsAny<User>()), Times.Exactly(tagsViewModels.Count()));
        }

        [Test]
        public void InsertOrRemoveTags_ShouldRemoveOnlyTagsNotIncludedInTagsViewModel()
        {
            var service = CreateService();
            var repoId = Guid.NewGuid();
            tagsViewModels.AddRange(tags.Take(tags.Count() - 1).Select(t => new TagViewModel() { Id = t.Id, Name = t.Name, Color = t.Color }));
            mockUnitOfWork.Setup(e => e.Tags.GetAllByRepoAndUser(repoId , user)).Returns(tags);

            service.InsertOrRemoveTags(tagsViewModels, repoId, user);

            mockUnitOfWork.Verify(e => e.Tags.RemoveRepoTags(new List<Tag>() { tags.Last() }, repoId, user));
        }

        [Test]
        public void UpsertAndRemove_ShouldRemoveOnlyTagsNotIncludedInUpsertTags()
        {
            var service = CreateService();
            tagsViewModels.AddRange(tags.Take(tags.Count() - 1).Select(t => new TagViewModel() { Id = t.Id, Name = t.Name, Color = t.Color }));
            mockUnitOfWork.Setup(e => e.Tags.GetAllByUser(user)).Returns(tags);

            service.UpsertAndRemove(tagsViewModels, user);

            mockUnitOfWork.Verify(e => e.Tags.RemoveRange(new List<Tag>() { tags.Last() }));
        }

        [Test]
        public void UpsertAndRemove_ShouldCallTagCreationInTheSameAmountOfNewTags()
        {
            var service = CreateService();
            mockUnitOfWork.Setup(e => e.Tags.GetAllByUser(user)).Returns(tags);

            service.UpsertAndRemove(tagsViewModels, user);

            mockTagService.Verify(e => e.Create(It.IsAny<string>(), It.IsAny<Colors>(), It.IsAny<User>()), Times.Exactly(tagsViewModels.Count()));
        }

        [Test]
        public void UpsertAndRemove_ShouldCallTagUpdateInTheSameAmountOfUpdatedTags()
        {
            var service = CreateService();
            tagsViewModels.AddRange(tags.Select(t => new TagViewModel() { Id = t.Id, Name = "Edited name", Color = t.Color }));
            mockUnitOfWork.Setup(e => e.Tags.GetAllByUser(user)).Returns(tags);

            service.UpsertAndRemove(tagsViewModels, user);

            mockUnitOfWork.Verify(e => e.Tags.Update(It.IsAny<Tag>()), Times.Exactly(tags.Count()));
        }
    }
}
