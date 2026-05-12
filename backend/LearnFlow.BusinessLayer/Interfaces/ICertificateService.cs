using LearnFlow.Domain.Models.Certificate;
using LearnFlow.Domain.Models.Responses;

namespace LearnFlow.BusinessLayer.Interfaces;

public interface ICertificateService
{
    List<CertificateDto> GetAll();
    CertificateDto? GetById(int id);
    ActionResponse Create(CreateCertificateDto dto);
    ActionResponse Update(int id, CreateCertificateDto dto);
    ActionResponse Delete(int id);
}
