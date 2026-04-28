using LearnFlow.Domain.Models.Certificate;
using LearnFlow.Domain.Models.Responses;
using LearnFlow.BusinessLayer.Interfaces;

namespace LearnFlow.BusinessLayer.Structure
{
    public class CertificateActionExecution : Core.CertificateActions, ICertificateService
    {
        public List<CertificateDto> GetAll() => GetAllActionExecution();
        public CertificateDto? GetById(int id) => GetByIdActionExecution(id);
        public ActionResponse Create(CreateCertificateDto dto) => CreateActionExecution(dto);
        public ActionResponse Update(int id, CreateCertificateDto dto) => UpdateActionExecution(id, dto);
        public ActionResponse Delete(int id) => DeleteActionExecution(id);
    }
}
