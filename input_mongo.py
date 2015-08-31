
import sys
import pymongo

connection = pymongo.MongoClient("mongodb://localhost")

db = connection.test
yarns = db.yarns

count = 0

with open("data.json") as f:
    data = f.read()
    print "about to insert the documents"
    for doc in data:
        try:
            yarns.insert_one(doc)
            count += 1
        except Exception as e:
            print "insert failed:", e

print str(count) + " documents inserted."
