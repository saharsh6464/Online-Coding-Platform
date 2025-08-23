package com.saharsh.Code.editor.Platform.service;

import com.saharsh.Code.editor.Platform.Dto.CreateTestRequest;
import com.saharsh.Code.editor.Platform.Dto.TestProblemDTO;
import com.saharsh.Code.editor.Platform.model.Company;
import com.saharsh.Code.editor.Platform.model.Question;
import com.saharsh.Code.editor.Platform.model.Test;
import com.saharsh.Code.editor.Platform.model.TestProblem;
import com.saharsh.Code.editor.Platform.repo.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TestService {

    @Autowired
    private TestRepository testRepository;
    public List<Test> getAllTests() {
        return testRepository.findAll();
    }

    public Optional<Test> getTestById(int id) {
        return testRepository.findById(id);
    }

    public Test saveTest(CreateTestRequest request) {
        Test test = new Test();
        test.setTestName(request.getTestName());
        test.setDescription(request.getDescription());
        test.setDurationMinutes(request.getDurationMinutes());
        test.setStartTime(request.getStartTime());
        test.setEndTime(request.getEndTime());
        Company c = new Company();
        c.setId(1);
        test.setCompany(c);
        List<TestProblem> problems = new ArrayList<>();
        int  i = 0;
        for (TestProblemDTO dto : request.getQuestions()) {
            Question q = new Question();
            TestProblem problem = new TestProblem();
            q.setProblemId(dto.getQuestionId());
            problem.setQuestion(q);
            problem.setPoints(dto.getPoints());
            problem.setTest(test); // link problem to test
            problem.setOrderIdTest(++i);
            problems.add(problem);

        }
        test.setTestProblems(problems);
        return testRepository.save(test);
    }

    public void deleteTest(int id) {
        testRepository.deleteById(id);
    }
}