package com.theGonzalos.Overseer.service;

import com.theGonzalos.Overseer.model.Requests;
import com.theGonzalos.Overseer.repository.RequestsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestsService {

    @Autowired
    private RequestsRepository requestsRepository;

    public List<Requests> getAllRequests(){
        return requestsRepository.findAll();
    }

    public void sendRequests(Requests request){
        requestsRepository.save(request);
    }

    public Requests getRequest(Integer reqId){
        return requestsRepository.findById(reqId).get();
    }

    public void deleteRequest(Integer reqId){
        requestsRepository.deleteById(reqId);
    }

}
