function eligibility = eligible (v,q)    
    eligibility = mean([v q])>=92 && v>88 && q>88;
end 