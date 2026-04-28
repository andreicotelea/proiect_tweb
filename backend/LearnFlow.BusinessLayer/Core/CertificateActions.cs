using LearnFlow.Domain.Models.Certificate;
using LearnFlow.Domain.Models.Responses;
using LearnFlow.DataAccessLayer.Context;
using LearnFlow.Domain.Entities.Certificate;
using Microsoft.EntityFrameworkCore;

namespace LearnFlow.BusinessLayer.Core
{
    public abstract class CertificateActions
    {
        protected CertificateActions() { }

        protected List<CertificateDto> GetAllActionExecution()
        {
            using var context = new AppDbContext();
            return context.Certificates.Include(c => c.Category).Select(c => new CertificateDto
            {
                Id = c.Id,
                Title = c.Title,
                Description = c.Description,
                Category = c.Category.Name,
                CategoryId = c.CategoryId,
                LessonsRequired = c.LessonsRequired,
                Duration = c.Duration,
                PdfUrl = c.PdfUrl,
                VideoUrl = c.VideoUrl,
            }).ToList();
        }

        protected CertificateDto? GetByIdActionExecution(int id)
        {
            using var context = new AppDbContext();
            var cert = context.Certificates.Include(c => c.Category).FirstOrDefault(c => c.Id == id);
            if (cert == null) return null;
            return new CertificateDto
            {
                Id = cert.Id,
                Title = cert.Title,
                Description = cert.Description,
                Category = cert.Category.Name,
                CategoryId = cert.CategoryId,
                LessonsRequired = cert.LessonsRequired,
                Duration = cert.Duration,
                PdfUrl = cert.PdfUrl,
                VideoUrl = cert.VideoUrl,
            };
        }

        protected ActionResponse CreateActionExecution(CreateCertificateDto dto)
        {
            using var context = new AppDbContext();
            var cert = new CertificateData
            {
                Title = dto.Title,
                Description = dto.Description,
                CategoryId = dto.CategoryId,
                LessonsRequired = dto.LessonsRequired,
                Duration = dto.Duration,
                PdfUrl = dto.PdfUrl,
                VideoUrl = dto.VideoUrl,
            };
            context.Certificates.Add(cert);
            context.SaveChanges();
            return new ActionResponse { IsSuccess = true, Message = "Certificare creata cu succes." };
        }

        protected ActionResponse UpdateActionExecution(int id, CreateCertificateDto dto)
        {
            using var context = new AppDbContext();
            var cert = context.Certificates.FirstOrDefault(c => c.Id == id);
            if (cert == null)
                return new ActionResponse { IsSuccess = false, Message = "Certificarea nu a fost gasita." };
            cert.Title = dto.Title;
            cert.Description = dto.Description;
            cert.CategoryId = dto.CategoryId;
            cert.LessonsRequired = dto.LessonsRequired;
            cert.Duration = dto.Duration;
            cert.PdfUrl = dto.PdfUrl;
            cert.VideoUrl = dto.VideoUrl;
            context.SaveChanges();
            return new ActionResponse { IsSuccess = true, Message = "Certificare actualizata." };
        }

        protected ActionResponse DeleteActionExecution(int id)
        {
            using var context = new AppDbContext();
            var cert = context.Certificates.FirstOrDefault(c => c.Id == id);
            if (cert == null)
                return new ActionResponse { IsSuccess = false, Message = "Certificarea nu a fost gasita." };
            context.Certificates.Remove(cert);
            context.SaveChanges();
            return new ActionResponse { IsSuccess = true, Message = "Certificare stearsa." };
        }
    }
}
