using LearnFlow.BusinessLayer.DTOs;

namespace LearnFlow.BusinessLayer.Interfaces;

public interface IProgressService
{
    Task<List<ProgressDto>> GetByUser(int userId);
    Task<ProgressDto> UpdateProgress(UpdateProgressDto dto);
}
